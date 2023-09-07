<?php
	if ($_SERVER["REQUEST_METHOD"] == "POST") {		
		$name = strip_tags(trim($_POST["name"]));
		$email=filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
	//	$phone=$_POST['Phone'];
		$message= trim($_POST['message']);

		$to='fungaimahara37@gmail.com'; // Receiver Email ID, Replace with your email ID
		  // Build the email content.
		  $subject = "New contact from: $name";
		
	
		// Build the email content.
	   $email_content .= "Name: $name\n";
       $email_content .= "Email: $email\n\n";
	 //  $email_content .= "Phone Number: $phone\n";
	  // $email_content = "Message:\n$message\n";
	   $email_content .= "Message:\n$message\n";
	
	   
        // Build the email headers.
	   $email_headers = "From: $name <$email>";
	   
		if(mail($to, $subject, $email_content, $email_headers)){
             // Set a 200 (okay) response code.
             http_response_code(200);
			echo 
			"<script>
                 alert('Sent Successfully! Thank you"." ".$name.", We will contact you shortly!');
                 window.location.href='index.html';
                  </script>"
                       
        }else {
                    // Set a 500 (internal server error) response code.
                    http_response_code(500);
                    echo "Oops! Something went wrong and we couldn't send your message.";
        
		}
	else{
		 // Not a POST request, set a 403 (forbidden) response code.
         http_response_code(403);
         echo "There was a problem with your submission, please try again.";
		}
	}
?>
