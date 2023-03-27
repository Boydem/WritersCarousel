<?php
$servername = "mysql";
$username = "root";
$password = "secret";
$dbname = "mydatabase";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}


$sql = "SELECT Writer._id, Writer.name, Writer.image_url, Post._id AS post_id, Post.title, Post.content, Post.url, Post.created_at
        FROM Writer
        INNER JOIN (
            SELECT Post.*, ROW_NUMBER() OVER (PARTITION BY writer_id ORDER BY created_at DESC) AS row_num
            FROM Post
            WHERE created_at >= DATE_SUB(NOW(), INTERVAL 2 WEEK)
        ) AS Post ON Writer._id = Post.writer_id AND Post.row_num <= 3
        GROUP BY Writer._id, Writer.name, Writer.image_url, Post._id, Post.title, Post.content, Post.url, Post.created_at
        HAVING COUNT(Post._id) >= 3";

$result = $conn->query($sql);

$writers = array();

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $writer_id = $row['_id'];
    $writer_name = $row['name'];
    $writer_image_url = $row['image_url'];
    
    if (!isset($writers[$writer_id])) {
      $writers[$writer_id] = array(
        'name' => $writer_name,
        'image_url' => $writer_image_url,
        'posts' => array(),
      );
    }
    
    $post_id = $row['post_id'];
    $post_title = $row['title'];
    $post_content = $row['content'];
    $post_url = $row['url'];
    $post_created_at = $row['created_at'];
    
    $writers[$writer_id]['posts'][] = array(
      'id' => $post_id,
      'title' => $post_title,
      'content' => $post_content,
      'url' => $post_url,
      'created_at' => $post_created_at,
    );
  }
}

header('Content-Type: application/json');
echo json_encode(array_values($writers));
$conn->close();
