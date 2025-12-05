import React from "react";

const ContactLocation = ({ className }: { className: string }) => {
  return (
    <div className={`${className}  rounded-lg`}>
      <iframe
        className="w-full h-full"
        title="map"
      src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3455.1309782251683!2d31.18616577555213!3d30.004395274943754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDAwJzE1LjgiTiAzMcKwMTEnMTkuNSJF!5e0!3m2!1sen!2seg!4v1764861490238!5m2!1sen!2seg"
        width="600"
        height="450"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default ContactLocation;
