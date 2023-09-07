
<?php


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form fields and remove whitespace.
    $name = strip_tags(trim($_POST["name"]));
    $name = str_replace(array("\r","\n"),array(" "," "),$name);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
	//$dialingcode = strip_tags(trim($_POST["dialingcode"]));
    $phone = strip_tags(trim($_POST["phone"]));
    $field=$_POST['field'];
    // $cont_subject = trim($_POST["subject"]);
     //   $message = trim($_POST["message"]);
    // Check that data was sent to the mailer.
    if ( empty($name) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Set a 400 (bad request) response code and exit.
        http_response_code(400);
        echo "Oops! There was a problem with your submission. Please complete the form and try again.";
        exit;
    }

    // Set the recipient email address.
    // FIXME: Update this to your desired email address.
    $recipient = "fungai@bi-dynamics.com";

    // Set the email subject.
    $subject = "New contact from $name";

    // Build the email content.
    $email_content .= "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Contact:\n$phone\n";
    $email_content .= "Registering As:\n$field\n";
   // $email_content .= "Code:\n$dialingcode\n";
    
   


    // Build the email headers.
    $email_headers = "From: $name <$email>";

    // Send the email.
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        // Set a 200 (okay) response code.
        http_response_code(200);
        echo"<script>
        alert('Registration Successful');
        window.location.href='index.html';
         </script>";
    } else {
        // Set a 500 (internal server error) response code.
        http_response_code(500);
        echo "Oops! Something went wrong and we couldn't submit your registration.";
    }

} else {
    // Not a POST request, set a 403 (forbidden) response code.
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}

?>