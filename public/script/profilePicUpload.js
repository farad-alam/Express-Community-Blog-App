window.onload = function() {
  // basecropping config
  var baseCropping = $("#cropped-image").croppie({
    viewport: {
      width: 200,
      height: 200,
      type: "circle",
    },
    boundary: {
      width: 300,
      height: 300,
    },
    showZoomer: true,
  });

  // create readble file funtion
  function readableFile(file) {
    let reader = new FileReader();
    reader.onload = function (event) {
      baseCropping
        .croppie("bind", {
          url: event.target.result,
        })
        .then(() => {
          
        });
    };

    reader.readAsDataURL(file);
  }

  // handle img upload with croppie
  $("#profilePic").on("change", (e) => {
    if (e.target.files[0]) {
      readableFile(e.target.files[0]);
      $("#croppie_modal").get(0).showModal();
    }
  });

  // Modal close handlers
  $("#cancel-cropping").on("click", () => {
    $("#croppie_modal").get(0).close(); // Close modal
  });

  // upload handler
  $("#upload-image").on("click", function () {
    baseCropping
      .croppie("result", "blob")
      .then((blob) => {
        // console.log(blob)
        const formData = new FormData();
        let file = document.getElementById("profilePic").files[0];
        formData.append("profilePic", blob, file.name);

        // Send to server
        fetch("http://localhost:3000/profile/upload-profile-pic", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            // console.log("Upload successful:", data);
            alert(data.message);
            $("#profilePicPreview").attr({
              src: data.filePath,
            });
            $("#croppie_modal").get(0).close(); // Close modal
          })
          .catch((error) => console.error("Error:", error));
      });
  });
}

