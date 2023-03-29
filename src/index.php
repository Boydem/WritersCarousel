<?php
$servername = "mysql";
$username = "root";
$password = "secret";
$dbname = "noam_israelhayom_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Allow xss for :3000
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if (strpos($_SERVER['REQUEST_URI'], '/api/writers') === 0) {
  $pageSize = 7;
  $currentPage = isset($_GET['page']) ? intval($_GET['page']) : 1;
  $start = ($currentPage - 1) * $pageSize;

  // Query writers with 3 most recent posts from the last 2 weeks
  $sql = "SELECT writer._id, writer.name, writer.img_url, post._id AS post_id, post.title, 
  SUBSTRING_INDEX(post.content, ' ', 7) AS content_excerpt, post.url, post.created_at
FROM (
  SELECT DISTINCT writer._id
  FROM writer
  INNER JOIN post
  ON writer._id = post.writer_id
  WHERE post.created_at >= DATE_SUB(NOW(), INTERVAL 2 WEEK)
  GROUP BY writer._id
  HAVING COUNT(DISTINCT post._id) >= 3
  ORDER BY MIN(post.created_at) DESC
  LIMIT ? , ?
) AS selected_writers
INNER JOIN (
  SELECT post.*, ROW_NUMBER() OVER (PARTITION BY writer_id ORDER BY created_at DESC) AS row_num
  FROM post
  WHERE created_at >= DATE_SUB(NOW(), INTERVAL 2 WEEK)
) AS post ON selected_writers._id = post.writer_id AND row_num <= 3
INNER JOIN writer ON selected_writers._id = writer._id
ORDER BY writer.name ASC";


  $writers = array();

  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ii", $start, $pageSize);
  $stmt->execute();
  $result = $stmt->get_result();
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
      $post_content = $row['content_excerpt'];
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

  // Count total number of rows
  $countSql = "SELECT COUNT(*) as total FROM (
    SELECT writer._id
    FROM writer
    INNER JOIN post
    ON writer._id = post.writer_id
    WHERE post.created_at >= DATE_SUB(NOW(), INTERVAL 2 WEEK)
    GROUP BY writer._id
    HAVING COUNT(DISTINCT post._id) >= 3
  ) AS total";

  $countResult = $conn->query($countSql);
  $totalCount = $countResult->fetch_assoc()['total'];

  $totalPages = ceil($totalCount / $pageSize);

  header('Content-Type: application/json');
  echo json_encode(array(
    'currentPage' => $currentPage,
    'totalPages' => $totalPages,
    'writers' => array_values($writers),
  ));
}

$conn->close();
