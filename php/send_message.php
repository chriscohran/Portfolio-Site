<?php
	
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$name = htmlspecialchars($_POST["name"]);
		$email = htmlspecialchars($_POST["email"]);
		$message = htmlspecialchars($_POST["message"]);
		$phone = htmlspecialchars($_POST["phone"]);
		
		if (empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
			http_response_code(400);
			echo "Uh-oh! Something went horribly wrong! Then again, maybe it was just a small error. Nevertheless, I'd recommend trying again!";
			exit;
		}
		
		if (!empty($phone)) {
			http_response_code(400);
			echo "Uh-oh! Looks like you're a bot! I don't accept mail from your kind. Sorry.";
			exit;
		}
		
		$recipient = "chris@chriscohran.com";
		$subject = "Message from ChrisCohran.com";
		
		$email_content = "Name: $name\n";
		$email_content .= "Email: $email\n\n";
		$email_content .= "Message:\n$message\n";
		
		$email_headers = "From: $name <$email>";
		
		if (mail($recipient, $subject, $email_content, $email_headers)) {
				http_response_code(200);
				echo "Your message has been sent!";
			} else {
				http_response_code(500);
				echo "Oh my...Did you do something wrong, or was it me? Either way, your message wasn't delivered.";
			}
		} else {
			http_response_code(403);
			echo "Uh-oh! Something went horribly wrong! Then again, maybe it was just a small error. Nevertheless, I'd recommend trying again!";
		}
		
?><!DOCTYPE html>
<html>
	<head>
		
		<meta charset="uft-8" />
		<meta http-equiv="x-ua-compatible" content="ie=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		
		<link href="../css/style.css" rel="stylesheet" type="text/css">
		
		<title>Chris Cohran | Web Developer</title>
		
	</head>
	
	<body id="mail-page">
		
		<noscript>
			<p>Click <a href="https://chriscohran.com">here</a> to go back.</p>
		</noscript>
		
	</body>
</html>