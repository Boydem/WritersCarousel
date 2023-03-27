<?php
$servername = "mysql";
$username = "root";
$password = "secret";
$dbname = "noam_israelhayom_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT writer._id, writer.name, writer.img_url, post._id AS post_id, post.title, post.content, post.url, post.created_at
FROM writer
INNER JOIN (
    SELECT post.*, ROW_NUMBER() OVER (PARTITION BY writer_id ORDER BY created_at DESC) AS row_num
    FROM post
    WHERE created_at >= DATE_SUB(NOW(), INTERVAL 2 WEEK)
) AS post ON writer._id = post.writer_id AND post.row_num <= 3
WHERE writer._id IN (
    SELECT writer._id
    FROM writer
    INNER JOIN post
    ON writer._id = post.writer_id
    WHERE post.created_at >= DATE_SUB(NOW(), INTERVAL 2 WEEK)
    GROUP BY writer._id
    HAVING COUNT(post._id) >= 3
)
ORDER BY post.created_at DESC;";


$result = $conn->query($sql);

$writers = array();

if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $writer_id = $row['_id'];
    $writer_name = $row['name'];
    $writer_img_url = $row['img_url'];

    if (!isset($writers[$writer_id])) {
      $writers[$writer_id] = array(
        'id' => $writer_id,
        'name' => $writer_name,
        'img_url' => $writer_img_url,
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
