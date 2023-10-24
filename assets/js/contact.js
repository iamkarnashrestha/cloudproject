
  function validateForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementsByName("message")[0].value;
    
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Initialize error message variable
    let errorName,errorEmail, errorMessage, errorSubject;

    // Validate Name
    if (name === "") {
      errorName = "Name is required.\n";
      $("#errorName").html("<span class='danger' >Name is required. </span>");
      return false;
    }
    else{
      $("#errorName").html("");
    }

    // Validate Email
    if (email === "") {
      $("#errorEmail").html("<span class='danger' >Email is required. </span>");
      return false;
    } else if (!email.match(emailRegex)) {
      $("#errorEmail").html("<span class='danger' >Invalid email format. </span>");
      return false;
    }
    else{
      $("#errorEmail").html("");
    }


    // Validate Subject
    if (subject === "") {
      $("#errorSubject").html("<span class='danger' >Subject is required. </span>");
      return false;
      
    }
    else{
      $("#errorSubject").html("");
    }


    // Validate Message
    if (message === "") {
      $("#errorMessage").html("<span class='danger' > Message is required </span>");
      return false;
    }
    else{
      $("#errorMessage").html("");
    }


    // Display error message if there are validation errors
   
    // If form is valid, send an AJAX request
    const date = new Date(); 
    const messageId=date.getTime();
    $.ajax({
      type: "POST", 
      url: "https://c40luvoh4i.execute-api.us-east-1.amazonaws.com/v1/message", 

      data: JSON.stringify({
        senderName: name,
        senderEmail: email,
        subject: subject,
        message: message,
      }),
      
      cache: false,
      success: function (response) {
        // Display the success message
        console.log(response);
              $("#success").html("<span class='success' > Message sent successfully.</span>");
              document.getElementById("contactForm").reset();
              return true;
      },
      error: function (error) {
        console.log(error);
        // Display an error message if the request fails
        $("#error-message").html("<span class='danger' > An error occurred while processing your request.</span>");
       
      }
    });
    return false;
     // Prevent the default form submission
  }

  // Add form submission event listener
  document.getElementById("contactForm").addEventListener("submit", function (event) {
    if (!validateForm()) {
      event.preventDefault(); // Prevent form submission if validation fails
    }
  });
