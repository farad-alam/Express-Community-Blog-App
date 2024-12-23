window.onload=()=>{

  tinymce.init({
    selector: "textarea",
    plugins: [
      // Core editing features
      "anchor",
      "autolink",
      "charmap",
      "codesample",
      "emoticons",
      "image",
      "link",
      "lists",
      "media",
      "searchreplace",
      "table",
      "visualblocks",
      "wordcount",
    ],
    toolbar:
      "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
    height: 600,
    automatic_uploads: true,
    images_upload_url: "/blog/blog-post-image-upload",
    images_upload_handler: (blobinfo, progress) =>
      new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append("Accept", "Application/JSON");

        let formData = new FormData();
        formData.append(
          "blog-post-image",
          blobinfo.blob(),
          blobinfo.filename()
        );

        let req = new Request("/blog/blog-post-image-upload", {
          method: "POST",
          headers,
          mode: "cors",
          body: formData,
        });

        fetch(req)
          .then((res) => res.json())
          .then((data) => resolve(data.imageURL))
          .catch((err) => reject({ message: "Http Error: " + err }));
      }),
    relative_urls: false,
    file_picker_types: "image",
    images_file_types: "jpg,svg,webp,jpg,png,gif",
    block_unsupported_drop: true,
    setup: function (editor) {
      editor.on("change", function () {
        tinymce.triggerSave(); // Update the textarea value on change
      });
    },
  });
}

document.querySelector("form").addEventListener("submit", function (event) {
  const tinyMCEContent = tinymce.get("text-body").getContent(); // Get the content
  document.getElementById("text-body").value = tinyMCEContent; // Sync it with the textarea
});
