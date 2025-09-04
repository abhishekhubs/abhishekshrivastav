import React, { useState, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send } from "lucide-react";
import { Link } from "react-router-dom";
import SocialLinks from "../components/SocialLinks";

import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: 'Mengirim Pesan...',
      html: 'Harap tunggu selagi kami mengirim pesan Anda',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const form = e.target;
      const formDataObj = new FormData(form);
      formDataObj.append("access_key", "7ce94cc3-1cdd-4fe1-a80b-33f6f2020118");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataObj
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          title: 'Berhasil!',
          text: 'Pesan Anda telah berhasil terkirim!',
          icon: 'success',
          confirmButtonColor: '#6366f1',
          timer: 2000,
          timerProgressBar: true
        });
        setFormData({ name: "", email: "", message: "" });
        form.reset();
      } else {
        Swal.fire({
          title: 'Gagal!',
          text: data.message || 'Terjadi kesalahan. Silakan coba lagi nanti.',
          icon: 'error',
          confirmButtonColor: '#6366f1'
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Gagal!',
        text: 'Terjadi kesalahan. Silakan coba lagi nanti.',
        icon: 'error',
        confirmButtonColor: '#6366f1'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-[5%] sm:px-[5%] lg:px-[10%] " >
      <div className="text-center lg:mt-[5%] mt-10 mb-2 sm:px-0 px-[5%]">
        <h2
          data-aos="fade-down"
          data-aos-duration="1000"
          className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        >
          <span
            style={{
              color: "#6366f1",
              backgroundImage:
                "linear-gradient(45deg, #6366f1 10%, #a855f7 93%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Contact Me!
          </span>
        </h2>
        <p
          data-aos="fade-up"
          data-aos-duration="1100"
          className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2"
        >
          Feel free to drop me a line, and I will get back to you shortly.
        </p>
      </div>

      <div className="flex justify-center items-center py-10">
        <SocialLinks />
      </div>
    </div>
  );
};

export default ContactPage;