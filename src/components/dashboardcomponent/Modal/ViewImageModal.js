import React from "react";

const ViewImageModal = ({ documentUrl, closeModal }) => {
  const handleDownload = async () => {
    try {
      const imageUrl = documentUrl; // Assuming Policy?.pdf_url points to the image URL
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = `Endorsment.jpg`; // Assuming the image format is JPG, adjust the extension accordingly

      downloadLink.click();
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <div className="modal-overlay fixed top-0 z-10 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75">
      <div className="modal bg-white rounded-lg shadow-lg p-6">
        <span
          className="close absolute top-2 right-2 text-gray-600 cursor-pointer text-white text-4xl"
          onClick={closeModal}
        >
          &times;
        </span>
        <img
          src={documentUrl}
          alt="Endorsement Document"
          className="w-full h-auto"
        />
        <div className="download-link text-center mt-4">
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Download Image
          </button>
        </div>
        <div className="download-link text-center mt-1">
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600 focus:outline-none "
          >
            Download Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewImageModal;
