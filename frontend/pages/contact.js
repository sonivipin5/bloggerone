import Div from "@/components/Div";
import { API_URL, SUPER_USER } from "@/config/env";
import Link from "next/link";
import React, {useState, useEffect} from "react";
import {FaMapMarkerAlt, FaPhoneAlt, FaRegEnvelope, FaUser} from "react-icons/fa";

const Contact = () => {
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Subject, setSubject] = useState("");
    const [Message, setMessage] = useState("");

    const regex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;

    const handleName = (e) => {
        const newName = e.target.value;
        setName(newName);
    };

    const handleEmail = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
    };

    const handleSubject = (e) => {
        const newSubject = e.target.value;
        setSubject(newSubject);
    };
    const handleMessage = (e) => {
        const newMessage = e.target.value;
        setMessage(newMessage);
    };

    // form submit function

    const submit = (e) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `bearer ${
            SUPER_USER
        }`);
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            data: {
                name: `${Name}`,
                email: `${Email}`,
                subject: `${Subject}`,
                message: `${Message}`
            }
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(`${API_URL}/api/contacts`, requestOptions).then((response) => response.text()).then((result) => result);

        setName("");
        setEmail("");
        setSubject("");
        setMessage("");

        const alert = document.querySelector(".alert");
        alert.classList.toggle("invisible");

        setTimeout(() => {
            alert.classList.add("invisible");
        }, 1500);
    };

    const preDefault = (e) => {
        e.preventDefault();
    };

    return (
        <Div> {/* Show submit message */}

            <div className="alert invisible relative flex justify-center transition-all">
                <div className="absolute  top-0 bg-green-200 p-3 px-5 rounded-md transition-all ">
                    <p>Submit Successful</p>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="w-full max-w-[1150px] p-5 flex flex-col sm:flex-row justify-between ">
                    <div className="w-full sm:w-[60%]">
                        {/* Contact Form */}
                        <Link href={`/contact`}>
                            <form onClick={preDefault}
                                method="post"
                                className="text-xs  ">
                                <h1 className="text-2xl mb-5">Contact Us</h1>

                                <label htmlFor="name">Name (required)</label>
                                <br/>
                                <input className="w-full  p-1 border border-[#a8a19c]  rounded mb-5 mt-1" type="text" name="" id="name"
                                    onChange={handleName}
                                    value={
                                        `${Name}`
                                    }
                                    required/>
                                <br/>

                                <label htmlFor="email">E-mail (required)</label>
                                <br/>
                                <input className="w-full p-1 border border-[#a8a19c]  rounded mb-5 mt-1" type="email" name="" id="email"
                                    onChange={handleEmail}
                                    pattern="(\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b)"
                                    value={
                                        `${Email}`
                                    }
                                    required
                                    title="enter veiled Email Example: email@email.com"/>
                                <br/>

                                <label htmlFor="subject">Subject (required)</label>
                                <br/>
                                <input className="w-full p-1 border border-[#a8a19c]  rounded mb-5 mt-1" type="text" name="" id="subject" title="Enter Minimum 5 character "
                                    onChange={handleSubject}
                                    value={
                                        `${Subject}`
                                    }
                                    required/>
                                <br/>

                                <label htmlFor="message">Message</label>
                                <br/>
                                <textarea rows="5" className="w-full p-1 border border-[#a8a19c]  rounded mb-5 mt-1" type="text" name="" id="message"
                                    onChange={handleMessage}
                                    value={
                                        `${Message}`
                                    }/>
                                <br/>

                                <button disabled={
                                        Name.length <= 4 || Email != Email.match(regex) || Subject.length <= 4
                                    }
                                    onClick={submit}
                                    className="bg-[#928675] hover:bg-[#978e80] active:bg-[#706554] rounded text-white p-1 text-lg disabled:bg-slate-300">
                                    {" "}
                                    Submit
                                </button>
                            </form>
                        </Link>
                    </div>

                    <div className="contact sm:w-[30%] ">
                        <h1 className="text-xs font-bold my-2">CONTACT US</h1>

                        <p className="bg-[#f0f0f0]  relative h-[1px] my-3 after:w-16 after:h-[1px] after:bg-[#747373]  after:absolute "></p>

                        <div className="text-xs space-y-3">
                            <p>
                                <FaMapMarkerAlt className="inline mx-1"/>
                                Vipdevs, abc
                                                Building, Gwalior
                            </p>
                            <p>
                                <FaPhoneAlt className="inline mx-1"/>
                                96xxxxxx12
                            </p>
                            <p>
                                <FaRegEnvelope className="inline mx-1"/>
                                sonivipin5@gmail.com
                            </p>
                            <p>
                                <FaUser className="inline mx-1"/>
                                vipdevelopers
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Div>
    );
};

export default Contact;
