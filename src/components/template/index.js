import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useRef, useState } from 'react';
import { Check, Edit, Edit2, Edit3, Upload, X } from 'react-feather';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Form, FormFeedback, Input, Label, Modal, ModalBody, Button, Row, Col, Badge, FormGroup, Card } from 'reactstrap';
import * as yup from 'yup';
// import { uploadCoverImage, uploadSignImage } from '../../../api/admin/certificateAPI';
import axios from 'axios';
// import { certificate } from '../../../configs/apiConfig';
import Flatpickr from 'react-flatpickr';
// import { selectThemeColors } from '@utils';

import lineImg from '../../assets/images/certi.png';

import { useNavigate } from 'react-router-dom';

import { useReactToPrint } from 'react-to-print';

import tem1 from '../../assets/images/tem1.jpg';
import tem2 from '../../assets/images/tem2.jpg';
import tem3 from '../../assets/images/tem3.jpg';
import tem4 from '../../assets/images/tem4.jpg';
import tem6 from '../../assets/images/tem6.jpg';
import tem7 from '../../assets/images/tem7.jpg';
import tem8 from '../../assets/images/tem8.jpg';
import tem9 from '../../assets/images/tem9.jpg';



function CreateCertificate() {

    const [data, setData] = useState();
    const navigate = useNavigate();

    const inputRefCoverImg = useRef(null);
    const inputRefTopLogo = useRef(null);

    const inputRefBottomLogo = useRef(null);
    const inputRefMainSign = useRef(null);
    const inputRefSubSign = useRef(null);

    const [coverImage, setCoverImage] = useState(
        'https://samsel.s3.ap-south-1.amazonaws.com/mgr/public/logo/file-17akn5dcsylqdfilpg.jpg'
    );
    const [topLogo, setTopLogo] = useState(
        'https://samsel.s3.ap-south-1.amazonaws.com/mgr/public/logo/file-17akn5dcsylqdfkguy.jpg'
    );
    const [bottomLogo, setBottomLogo] = useState(
        'https://samsel.s3.ap-south-1.amazonaws.com/mgr/public/logo/file-17akn5dcsylqdfos1b.jpg'
    );
    const [mainSign, setMainSign] = useState(
        'https://samsel.s3.ap-south-1.amazonaws.com/mgr/public/logo/file-17akn5dcsylqdfl9h0.jpg'
    );
    const [subSign, setSubSign] = useState(
        'https://samsel.s3.ap-south-1.amazonaws.com/mgr/public/logo/file-17akn5dcsylqdfm8on.jpg'
    );
    const [startDate, setStartDate] = useState('20-12-2023');
    const [endDate, setEndDate] = useState('30-12-2023');
    const [templateName, setTemplateName] = useState('');
    const [color, setcolor] = useState('');
    const [font, setfont] = useState('25');
    const [subcolor, setsubcolor] = useState();
    const [subfont, setsubfont] = useState('25');
    const [thirdcolor, setthirdcolor] = useState();
    const [thirdfont, setthirdfont] = useState('25');
    const [datecolor, setdatecolor] = useState();
    const [datefont, setdatefont] = useState('25');
    const [areacolor, setareacolor] = useState();
    const [areafont, setareafont] = useState('25');
    const [signcolor, setsigncolor] = useState();
    const [signfont, setsignfont] = useState('25');
    const [lastcolor, setlastcolor] = useState();
    const [lastfont, setlastfont] = useState('25');
    const [fontfamily, setfontfamily] = useState('');
    const [subfontfamily, setsubfontfamily] = useState('');
    const [desfontfamily, setdesfontfamily] = useState('');
    const [datefontfamily, setdatefontfamily] = useState('');
    const [placefontfamily, setplacefontfamily] = useState('');
    const [signfontfamily, setsignfontfamily] = useState('');
    const [rolefontfamily, setrolefontfamily] = useState('');
    const [candidatefont, setcandidatefont] = useState('');
    const [candidatecolor, setcandidatecolor] = useState('');
    const [candidatefamily, setcandidatefamily] = useState('');
    const [headlogo, setheadlogo] = useState('100');
    const [leftsign, setleftsign] = useState('90');
    const [rightsign, setrightsign] = useState('90');
    const [bottomimg, setbottomimg] = useState('150');
    const [banner, setbanner] = useState('880')
    const [hoveredIndex, setHoveredIndex] = useState(null);




    const certificateSchema = yup.object().shape({
        templateName: yup.string().required(' Name must be required!'),
        title: yup.string().required(' Title must be required!'),
        subTitle: yup.string().required(' Sub Title must be required!'),
        content_1: yup.string().required(' Content One must be required!'),
        content_2: yup.string().required(' Content Two must be required!'),
        place: yup.string().required(' Place must be required!'),
        mainIncharge: yup.object().shape({
            name: yup.string().required('Incharge Name must be required!'),
            role: yup.string().required('Incharge Role must be required!')
            // sign: yup.string().required('Sign must be required!'),
        }),
        subIncharge: yup.object().shape({
            name: yup.string().required('Sub Incharge Name must be required!'),
            role: yup.string().required('Sub Incharge Role must be required!')
            // sign: yup.string().required('Sign must be required!'),
        })
    });

    const defaultValues = {
        templateName: 'Participation Certificate',
        title: 'DEPARTMENT OF COMPUTER APPLICATIONS',
        subTitle: 'CERTIFICATE OF PARTICIPATION',
        content_1: 'This certificate is presented to',
        candidate: '---------------------',
        content_2:
            'in acknowledgment of [his/her] outstanding achievements and remarkable dedication in the realm of sports. Throughout this training program, he has demonstrated exceptional',
        place: 'Dr. MGR Educational and Research Institute , Chennai- 600095.',
        mainIncharge: {
            name: 'SURESH KUMAR',
            role: 'Head Manager'
            // sign: 'Default Sign',
        },
        subIncharge: {
            name: 'JAGANATHAN',
            role: 'Mentor'
            // sign: 'Default Sign',
        }
    };

    const {
        reset,
        control,
        setValue,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm({ mode: 'onChange', resolver: yupResolver(certificateSchema), defaultValues });

    const handleReset = () => {
        reset({
            templateName: '',
            title: '',
            subTitle: '',
            content_1: '',
            content_2: '',
            place: '',
            mainIncharge: {
                name: '',
                role: ''
                // sign: '', // If needed
            },
            subIncharge: {


                name: '',
                role: ''
                // sign: '', // If needed
            }
        });
        setTopLogo('');
        setBottomLogo('');
        setCoverImage('');
        setMainSign('');
        setSubSign('');
    };

    const formatDate = (date) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = new Date(date).toLocaleDateString('en-GB', options);
        const [day, month, year] = formattedDate.split('/'); // Split the formatted date
        return `${day}-${month}-${year}`;
    };
    const handleStartDateChange = (dates) => {
        const formattedStartDate = dates[0] ? formatDate(dates[0]) : ''; // Format the date to yyyy-mm-dd
        setStartDate(formattedStartDate);
    };

    const handleEndDateChange = (dates) => {
        const formattedEndDate = dates[0] ? formatDate(dates[0]) : ''; // Format the date to yyyy-mm-dd
        setEndDate(formattedEndDate);
    };



    const watchedTitle = watch('title');
    const watchedSubTitle = watch('subTitle');
    const watchedcontent_1 = watch('content_1');
    const watchedcontent_2 = watch('content_2');
    const watchedcandidate = watch('candidate')
    const watchedPlace = watch('place');
    const watchedMainInc = watch('mainIncharge.name');
    const watchedMainIncRole = watch('mainIncharge.role');
    const watchedSubInc = watch('subIncharge.name');
    const watchedSubIncRole = watch('subIncharge.role');


    const [isTitle, setIsTitle] = useState(false);
    const [isSubTitle, setIsSubTitle] = useState(false);
    const [isContentOne, setIsContentOne] = useState(false);
    const [isContentTwo, setIsContentTwo] = useState(false);
    const [isCandidatename, setcandidatename] = useState(false)
    const [isStartDate, setIsStartDate] = useState(false);
    const [isEndDate, setIsEndDate] = useState(false);
    const [isPlace, setIsPlace] = useState(false);
    const [isMainInCharge, setIsMainInCharge] = useState(false);
    const [isSubInCharge, setIsSubInCharge] = useState(false);
    const [isMainInChargeRole, setIsMainInChargeRole] = useState(false);
    const [isSubInChargeRole, setIsSubInChargeRole] = useState(false);

    const handleResetPage = () => {
        window.location.reload(false);
    };


    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documenttitle: 'emp-data',
        onAfterPrint: () => alert('Print success')
    });

    const handleCoverUpload = async (e) => {
        if (e.target.files && e.target.files[0]) {
            setCoverImage(URL.createObjectURL(e.target.files[0]));
        }
        if (e.target.files) {
            try {
                const formData = new FormData();
                formData.append('file', e.target.files[0]);

                const uploadData = await coverImage(formData);
                if (uploadData && uploadData.result && uploadData.result.length) {
                    setCoverImage(uploadData.result[0].location);
                }
            } catch (error) {
                toast.error('Something went wrong...');
            }
        }

    };
    const handleTopLogoUpload = async (e) => {
        if (e.target.files && e.target.files[0]) {
            setTopLogo(URL.createObjectURL(e.target.files[0]));
        }
        if (e.target.files) {
            try {
                const formData = new FormData();
                formData.append('file', e.target.files[0]);

                const uploadData = await topLogo(formData);
                if (uploadData && uploadData.result && uploadData.result.length) {
                    setTopLogo(uploadData.result[0].location);
                }
            } catch (error) {
                toast.error('Something went wrong...');
            }
        }

    };
    const handleMainSignUpload = async (e) => {
        if (e.target.files && e.target.files[0]) {
            setMainSign(URL.createObjectURL(e.target.files[0]));
        }
        if (e.target.files) {
            try {
                const formData = new FormData();
                formData.append('file', e.target.files[0]);

                const uploadData = await mainSign(formData);
                if (uploadData && uploadData.result && uploadData.result.length) {
                    setMainSign(uploadData.result[0].location);
                }
            } catch (error) {
                toast.error('Something went wrong...');
            }
        }

    };
    const handleBottomLogoUpload = async (e) => {
        if (e.target.files && e.target.files[0]) {
            setBottomLogo(URL.createObjectURL(e.target.files[0]));
        }
        if (e.target.files) {
            try {
                const formData = new FormData();
                formData.append('file', e.target.files[0]);

                const uploadData = await bottomLogo(formData);
                if (uploadData && uploadData.result && uploadData.result.length) {
                    setBottomLogo(uploadData.result[0].location);
                }
            } catch (error) {
                toast.error('Something went wrong...');
            }
        }

    };
    const handleSubSignUpload = async (e) => {
        if (e.target.files && e.target.files[0]) {
            setSubSign(URL.createObjectURL(e.target.files[0]));
        }
        if (e.target.files) {
            try {
                const formData = new FormData();
                formData.append('file', e.target.files[0]);

                const uploadData = await subSign(formData);
                if (uploadData && uploadData.result && uploadData.result.length) {
                    setSubSign(uploadData.result[0].location);
                }
            } catch (error) {
                toast.error('Something went wrong...');
            }
        }

    };
    const templateData = [
        { imageUrl: ' https://samsel.s3.ap-south-1.amazonaws.com/printonWhatsApp%20Image%202024-01-04%20at%2017.31.32_bba99ce8.jpg' },
        { imageUrl: 'https://samsel.s3.ap-south-1.amazonaws.com/printonWhatsApp%20Image%202024-01-04%20at%2017.31.33_c5c003b0.jpg' },
        { imageUrl: 'https://samsel.s3.ap-south-1.amazonaws.com/printonWhatsApp%20Image%202024-01-04%20at%2017.31.33_75661026.jpg' },
        { imageUrl: 'https://samsel.s3.ap-south-1.amazonaws.com/printonWhatsApp%20Image%202024-01-04%20at%2017.31.33_548924bf.jpg' },
        { imageUrl: 'https://samsel.s3.ap-south-1.amazonaws.com/printonWhatsApp%20Image%202024-01-04%20at%2017.31.33_1cb9f378.jpg' },
        { imageUrl: 'https://samsel.s3.ap-south-1.amazonaws.com/printonWhatsApp%20Image%202024-01-04%20at%2017.31.34_c00f0f77.jpg' },
        { imageUrl: 'https://samsel.s3.ap-south-1.amazonaws.com/printonWhatsApp%20Image%202024-01-04%20at%2017.31.34_8cb2262f.jpg' },

    ];

    return (

        <div style={{ justifyContent: 'space-between', padding: '10px' }} >

            <div className=" d-flex justify-content-end pb-5 ">

                <div className="pt-2">
                    <Button className="me-1" color="primary" onClick={handlePrint}>
                        Print
                    </Button>

                    <Button outline color="secondary" type="reset" onClick={handleResetPage}>
                        Reset
                    </Button>
                </div>
            </div>

            {/* first div */}


            <div className='d-flex' style={{ justifyContent: 'space-between' }}>

                <div style={{
                    overflow: 'auto', height: '880px', width: '300px', listStyle: 'none', padding: '10px', textAlign: 'center', border: '1px solid #ccc'
                }} >
                    {/* <b><h4 style={{ marginLeft: "50px" }}>TEMPLATES</h4></b> */}
                    <div>
                        {templateData.map((template, index) => (
                            <div
                                key={index}
                                style={{
                                    cursor: 'pointer',
                                    borderRadius: '50%',
                                    transform: hoveredIndex === index ? 'scale(1.11)' : 'scale(1)',
                                    transition: 'transform 0.3s ease',
                                    marginTop: '20px'
                                }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onClick={() => setCoverImage(template.imageUrl)}
                            >
                                <img src={template.imageUrl} alt={`tem${index + 1}`} style={{ height: '200px', width: '250px' }} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* second div */}


                <Card
                    ref={componentRef}
                    style={{
                        padding: '10px',
                        backgroundImage: `url(${coverImage})`,
                        // height: `${banner}px`,
                        // position: 'fixed',
                        height: '800px',
                        width: '1100px',
                        // width: '1250px',
                        backgroundSize: 'cover',
                        border: 'none'
                    }}>
                    <div style={{}}>
                        <div >
                            <div className="d-flex justify-content-end" style={{ cursor: 'pointer' }}>
                                <div className="pe-1 pt-1">
                                    <input
                                        style={{ display: 'none' }}
                                        type="file"
                                        ref={inputRefCoverImg}
                                        onChange={handleCoverUpload}
                                    />
                                    <span
                                        onClick={() => {
                                            inputRefCoverImg?.current?.click();
                                        }}
                                    >
                                        <span style={{ color: '#b32124' }}>
                                            <Upload size={20} />
                                        </span>
                                    </span>
                                </div>
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'start',
                                    alignItems: 'center',
                                    paddingLeft: '8%',
                                    paddingRight: '8%'
                                }}
                            >
                                <div className="d-flex justify-content-center">
                                    <div style={{ paddingLeft: '70px', marginTop: '40px' }}>
                                        <img src={topLogo} style={{ marginTop: '10px', height: `${headlogo}px`, width: 'auto' }} alt="" />
                                    </div>

                                    <div className="ms-2 mt-4" style={{ paddingTop: '60px' }}>
                                        <>
                                            <div className="d-flex" style={{ cursor: 'pointer' }}>
                                                <input
                                                    style={{ display: 'none' }}
                                                    type="file"
                                                    ref={inputRefTopLogo}
                                                    onChange={handleTopLogoUpload}
                                                />
                                                <span
                                                    onClick={() => {
                                                        inputRefTopLogo?.current?.click();
                                                    }}
                                                >
                                                    <span style={{ color: '#b32124', marginBottom: '30px' }}>
                                                        <Upload size={20} />
                                                    </span>
                                                </span>
                                            </div>
                                        </>
                                    </div>
                                </div>
                                {isTitle ? (
                                    <div className="mb-1 mt-1 d-flex">
                                        <h1
                                            style={{
                                                fontSize: `${font}px`,
                                                textAlign: 'center',
                                                color: `${color}`,
                                                fontFamily: `${fontfamily}`,
                                                fontWeight: 'bold',
                                                margin: '0px',
                                                padding: '0px',
                                                marginTop: '25px',
                                                paddingBottom: '15px'
                                            }}
                                        >
                                            {watchedTitle}{' '}

                                        </h1>
                                        <span
                                            className="text-success ms-1"
                                            style={{ marginTop: '30px', cursor: 'pointer', }}
                                            onClick={() => setIsTitle(false)}
                                        >
                                            <Check size={30} />
                                        </span>
                                    </div>
                                ) : (
                                    <h1
                                        style={{
                                            fontSize: `${font}px`,
                                            textAlign: 'center',
                                            color: `${color}`,
                                            fontFamily: `${fontfamily}`,
                                            fontWeight: 'bold',
                                            margin: '0px',
                                            padding: '0px',
                                            marginTop: '25px',
                                            paddingBottom: '15px'
                                        }}
                                    >
                                        {watchedTitle}{' '}
                                        <span style={{ color: '#b32124', cursor: 'pointer' }} onClick={() => setIsTitle(true)}>
                                            <Edit3 />
                                        </span>
                                    </h1>
                                )}

                                {isSubTitle ? (
                                    <div className="mb-1 d-flex">
                                        <h3
                                            style={{
                                                color: `${subcolor}`,
                                                fontSize: `${subfont}px`,
                                                textAlign: 'center',
                                                fontFamily: `${subfontfamily}`,
                                                margin: '0px',
                                                padding: '0px'
                                            }}
                                        >
                                            {watchedSubTitle}{' '}
                                            <span
                                                className="text-success ms-1"
                                                style={{ marginTop: '30px', cursor: 'pointer' }}
                                                onClick={() => setIsSubTitle(false)}
                                            >
                                                <Check size={30} />
                                            </span>
                                        </h3>


                                    </div>
                                ) : (
                                    <h3
                                        style={{
                                            color: `${subcolor}`,
                                            fontSize: `${subfont}px`,
                                            textAlign: 'center',
                                            fontFamily: `${subfontfamily}`,
                                            margin: '0px',
                                            padding: '0px'
                                        }}
                                    >
                                        {watchedSubTitle}{' '}
                                        <span style={{ color: '#b32124', cursor: 'pointer' }} onClick={() => setIsSubTitle(true)}>
                                            <Edit3 />
                                        </span>
                                    </h3>
                                )}

                                <img src={lineImg} alt srcSet />
                                <h6
                                    style={{
                                        color: `${thirdcolor}`,
                                        fontSize: `${thirdfont}px`,
                                        textAlign: 'center',
                                        fontFamily: `${desfontfamily}`,
                                        fontWeight: '400',
                                        margin: '0px',
                                        padding: '0px',
                                        paddingTop: '30px',
                                        paddingBottom: '30px'
                                    }}
                                >
                                    {isContentOne ? (
                                        <div className="mb-1 d-flex">

                                            {watchedcontent_1}

                                            <span
                                                className="text-success ms-1"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => setIsContentOne(false)}
                                            >
                                                <Check size={35} />
                                            </span>
                                        </div>
                                    ) : (
                                        <>
                                            {watchedcontent_1}{' '}
                                            <span style={{ color: '#b32124', cursor: 'pointer' }} onClick={() => setIsContentOne(true)}>
                                                <Edit3 />
                                            </span>{' '}
                                        </>
                                    )}
                                    <span
                                        // {watchedcandidate}
                                        style={{
                                            color: '#436894',
                                            textDecoration: 'underline',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Candidate Name
                                        <span style={{ color: '#b32124', cursor: 'pointer' }} onClick={() => setcandidatename(true)}><Edit3 /></span>

                                    </span>{' '}
                                    {isContentTwo ? (
                                        <div className="mb-1 d-flex">
                                            {watchedcontent_2}
                                            <span
                                                className="text-success ms-1"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => setIsContentTwo(false)}
                                            >
                                                <Check size={35} />
                                            </span>
                                        </div>
                                    ) : (
                                        <>
                                            {watchedcontent_2}{' '}
                                            <span style={{ color: '#b32124', cursor: 'pointer' }} onClick={() => setIsContentTwo(true)}>
                                                <Edit3 />
                                            </span>{' '}
                                            <br />
                                        </>
                                    )}
                                    <span
                                        style={{
                                            color: `${datecolor}`,
                                            fontWeight: 'bold',
                                            fontSize: `${datefont}px`,
                                            fontFamily: `${datefontfamily}`
                                        }}
                                    >
                                        {isStartDate ? (
                                            <div className="d-flex">
                                                {startDate}
                                                <span
                                                    className="text-success ms-1"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => setIsStartDate(false)}
                                                >
                                                    <Check size={30} />
                                                </span>
                                            </div>
                                        ) : (
                                            <>
                                                {startDate}{' '}
                                                <span style={{ color: '#b32124', cursor: 'pointer' }} onClick={() => setIsStartDate(true)}>
                                                    <Edit3 />
                                                </span>
                                            </>
                                        )}
                                    </span>{' '}
                                    to
                                    <span
                                        style={{
                                            color: `${datecolor}`,
                                            fontWeight: 'bold',
                                            fontSize: `${datefont}px`,
                                            fontFamily: `${datefontfamily}`,
                                            marginLeft: '8px'
                                        }}
                                    >
                                        {isEndDate ? (
                                            <div className="d-flex">
                                                {endDate}
                                                <span
                                                    className="text-success ms-1"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => setIsEndDate(false)}
                                                >
                                                    <Check size={30} />
                                                </span>
                                            </div>
                                        ) : (
                                            <>
                                                {endDate}{' '}
                                                <span style={{ color: '#b32124', cursor: 'pointer' }} onClick={() => setIsEndDate(true)}>
                                                    <Edit3 />
                                                </span>
                                            </>
                                        )}
                                    </span>
                                    <br />
                                    at{' '}
                                    <span
                                        style={{
                                            color: `${areacolor}`,
                                            fontWeight: 'bold',
                                            fontSize: `${areafont}px`,
                                            fontFamily: `${placefontfamily}`
                                        }}
                                    >
                                        {isPlace ? (
                                            <div className="d-flex">
                                                {watchedPlace}
                                                <span
                                                    className="text-success ms-1"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => setIsPlace(false)}
                                                >
                                                    <Check size={30} />
                                                </span>
                                            </div>
                                        ) : (
                                            <>
                                                {watchedPlace}{' '}
                                                <span style={{ color: '#b32124', cursor: 'pointer' }} onClick={() => setIsPlace(true)}>
                                                    <Edit3 />
                                                </span>
                                            </>
                                        )}
                                    </span>
                                </h6>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        width: '100%',
                                        marginTop: '20px'
                                    }}
                                >
                                    <div style={{ textAlign: 'center' }}>
                                        <div className="d-flex">
                                            <img src={mainSign} style={{ height: `${leftsign}px`, width: 'auto' }} alt="" />
                                            {/* Main Incharge Sign Upload Start */}
                                            <div className="mb-2 ms-1">
                                                <>
                                                    <div className="d-flex" style={{ cursor: 'pointer' }}>
                                                        <input
                                                            style={{ display: 'none' }}
                                                            type="file"
                                                            ref={inputRefMainSign}
                                                            onChange={handleMainSignUpload}
                                                        />
                                                        <span
                                                            onClick={() => {
                                                                inputRefMainSign?.current?.click();
                                                            }}
                                                        >
                                                            <span style={{ color: '#b32124' }}>
                                                                <Upload size={20} />
                                                            </span>
                                                        </span>
                                                    </div>
                                                </>
                                            </div>
                                            {/* Main Incharge Sign Upload End */}
                                        </div>

                                        <hr style={{ color: '#8a8077' }} />
                                        {isMainInCharge ? (
                                            <div className="mb-1 d-flex">
                                                {watchedMainInc}
                                                <span
                                                    className="text-success ms-1"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => setIsMainInCharge(false)}
                                                >
                                                    <Check size={30} />
                                                </span>
                                            </div>
                                        ) : (
                                            <b style={{ color: `${signcolor}`, fontSize: `${signfont}px`, fontFamily: `${signfontfamily}`, margin: '0px', padding: '0px' }}>
                                                {watchedMainInc}{' '}
                                                <span style={{ color: '#b32124', cursor: 'pointer' }} onClick={() => setIsMainInCharge(true)}>
                                                    <Edit3 />
                                                </span>
                                            </b>
                                        )}

                                        {isMainInChargeRole ? (
                                            <div className="mb-1 d-flex">
                                                {watchedMainIncRole}
                                                <span
                                                    className="text-success ms-1"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => setIsMainInChargeRole(false)}
                                                >
                                                    <Check size={30} />
                                                </span>
                                            </div>
                                        ) : (
                                            <h5 style={{ color: `${lastcolor}`, fontSize: `${lastfont}px`, fontFamily: `${rolefontfamily}`, margin: '0px', padding: '0px' }}>
                                                {watchedMainIncRole}{' '}
                                                <span
                                                    style={{ color: '#b32124', cursor: 'pointer' }}
                                                    onClick={() => setIsMainInChargeRole(true)}
                                                >
                                                    <Edit3 />
                                                </span>
                                            </h5>
                                        )}
                                    </div>
                                    <div className="d-flex">
                                        <img src={bottomLogo} style={{ height: `${bottomimg}px`, width: 'auto' }} alt="" />
                                        <div className="ms-0 mt-1">
                                            <>
                                                <div className="d-flex" style={{ cursor: 'pointer' }}>
                                                    <input
                                                        style={{ display: 'none' }}
                                                        type="file"
                                                        ref={inputRefBottomLogo}
                                                        onChange={handleBottomLogoUpload}
                                                    />
                                                    <span
                                                        onClick={() => {
                                                            inputRefBottomLogo?.current?.click();
                                                        }}
                                                    >
                                                        <span style={{ color: '#b32124' }}>
                                                            <Upload size={20} />
                                                        </span>
                                                    </span>
                                                </div>
                                            </>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <div className="d-flex">
                                            {/* Sub Incharge Sign Upload Start */}
                                            <div className="me-1">
                                                {/* <Label className="form-label" for="task-title">
                        Signature
                      </Label> */}
                                                <>
                                                    <div className="d-flex" style={{ cursor: 'pointer' }}>
                                                        <input
                                                            style={{ display: 'none' }}
                                                            type="file"
                                                            ref={inputRefSubSign}
                                                            onChange={handleSubSignUpload}
                                                        />
                                                        <span
                                                            onClick={() => {
                                                                inputRefSubSign?.current?.click();
                                                            }}
                                                        >
                                                            <span style={{ color: '#b32124' }}>
                                                                <Upload size={20} />
                                                            </span>
                                                        </span>
                                                    </div>
                                                </>
                                            </div>
                                            {/* Sub Incharge Sign Upload End */}
                                            <img src={subSign} style={{ height: `${rightsign}px`, width: 'auto' }} alt="" />
                                        </div>

                                        <hr style={{ color: '#8a8077' }} />
                                        {isSubInCharge ? (
                                            <div className="mb-1 d-flex">
                                                {watchedSubInc}
                                                <span
                                                    className="text-success ms-1"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => setIsSubInCharge(false)}
                                                >
                                                    <Check size={30} />
                                                </span>
                                            </div>
                                        ) : (
                                            <b style={{ color: `${signcolor}`, fontSize: `${signfont}px`, fontFamily: `${signfontfamily}`, margin: '0px', padding: '0px' }}>
                                                {watchedSubInc}{' '}
                                                <span style={{ color: '#b32124', cursor: 'pointer' }} onClick={() => setIsSubInCharge(true)}>
                                                    <Edit3 />
                                                </span>
                                            </b>
                                        )}

                                        {isSubInChargeRole ? (
                                            <div className="mb-1 d-flex">
                                                {watchedSubIncRole}
                                                <span
                                                    className="text-success ms-1"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => setIsSubInChargeRole(false)}
                                                >
                                                    <Check size={30} />
                                                </span>
                                            </div>
                                        ) : (
                                            <h5 style={{ color: `${lastcolor}`, fontSize: `${lastfont}px`, fontFamily: `${rolefontfamily}`, margin: '0px', padding: '0px' }}>
                                                {watchedSubIncRole}{' '}
                                                <span
                                                    style={{ color: '#b32124', cursor: 'pointer' }}
                                                    onClick={() => setIsSubInChargeRole(true)}
                                                >
                                                    <Edit3 />
                                                </span>
                                            </h5>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* last div */}

                <div style={{
                    overflow: 'auto', height: '880px', width: '350px', listStyle: 'none', padding: '10px', textAlign: 'center', border: '1px solid #ccc'
                }} >
                    <Form >
                        {isTitle ? (
                            <div>
                                <div>
                                    <Label className="form-label" for="title">
                                        <b>CERTIFICATE TITTLE</b>
                                    </Label>
                                    <Controller
                                        id="title"
                                        name="title"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                // style={{ width: '350px' }}
                                                type="text"
                                                placeholder="Enter  title"
                                                invalid={errors.title && true}
                                            />
                                        )}
                                    />
                                    {errors.title && <FormFeedback>{errors.title.message}</FormFeedback>}
                                </div>
                                <FormGroup>
                                    <Label for="  TittleColor">
                                        <b>TITTLE COLOR</b>
                                    </Label>
                                    <Input
                                        id="  TittleColor"
                                        name="color"
                                        placeholder="color placeholder"
                                        type="color"
                                        onChange={(e) => setcolor(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="Tittle">
                                        <b>TITTLE</b>
                                    </Label>
                                    <Input
                                        id="Tittle"
                                        name="select"
                                        type="number"
                                        onChange={(e) => setfont(e.target.value)}
                                        defaultValue={font}
                                    >
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="fontFamilyInput">
                                        <b>TITTLE FONTS FAMILY</b>
                                    </Label>
                                    <Input
                                        id="fontFamilyInput"
                                        name="select"
                                        value={fontfamily}
                                        type="select"
                                        onChange={(e) => setfontfamily(e.target.value)}
                                    >
                                        <option value="Arial">Arial</option>
                                        <option value="Times New Roman">Times New Roman</option>
                                        <option value="Courier New">Courier New</option>
                                        <option value="Verdana">Verdana</option>
                                        <option value="Georgia">Georgia</option>
                                        <option value="Tahoma">Tahoma</option>
                                        <option value="Helvetica">Helvetica</option>
                                        <option value="Arial Black">Arial Black</option>
                                        <option value="Comic Sans MS">Comic Sans MS</option>
                                        <option value="Impact">Impact</option>
                                        <option value="Lucida Sans Unicode">Lucida Sans Unicode</option>
                                        <option value="Palatino Linotype">Palatino Linotype</option>
                                        <option value="Tahoma">Tahoma</option>
                                        <option value="Trebuchet MS">Trebuchet MS</option>
                                        <option value="Garamond">Garamond</option>
                                        <option value="Book Antiqua">Book Antiqua</option>
                                        <option value="Arial Narrow">Arial Narrow</option>
                                        <option value="Century Gothic">Century Gothic</option>
                                        <option value="Franklin Gothic Medium">Franklin Gothic Medium</option>
                                        <option value="Copperplate">Copperplate</option>
                                        <option value="Consolas">Consolas</option>
                                        <option value="Monaco">Monaco</option>
                                    </Input>
                                </FormGroup>
                            </div>
                        )
                            : (
                                <>
                                    {''}
                                </>
                            )}

                        {isSubTitle ? (
                            <div>
                                <div>
                                    <Label className="form-label" for="subTitle">
                                        <b>CERTIFICATE SUBTITLE</b>
                                    </Label>
                                    <Controller
                                        id="subTitle"
                                        name="subTitle"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                style={{ width: '600px' }}
                                                type="text"
                                                placeholder="Enter  Sub Title"
                                                invalid={errors.subTitle && true}
                                            />
                                        )}
                                    />
                                    {errors.subTitle && <FormFeedback>{errors.subTitle.message}</FormFeedback>}
                                </div>

                                <FormGroup>
                                    <Label for="   SubTittleColor">
                                        <b>SUBTITTLE COLOR</b>
                                    </Label>
                                    <Input
                                        id="   SubTittleColor"
                                        name="color"
                                        placeholder="color placeholder"
                                        type="color"
                                        onChange={(e) => setsubcolor(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="SubTittle">
                                        <b>SUB TITTLE</b>
                                    </Label>
                                    <Input
                                        id="SubTittle"
                                        name="select"
                                        type="number"
                                        onChange={(e) => setsubfont(e.target.value)}
                                        defaultValue={subfont}
                                    >
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="fontFamilyInput">
                                        <b>SUB TITTLE FONT FAMILY</b>
                                    </Label>
                                    <Input
                                        id="fontFamilyInput"
                                        name="select"
                                        value={subfontfamily}
                                        type="select"
                                        onChange={(e) => setsubfontfamily(e.target.value)}
                                    >
                                        <option value="Arial">Arial</option>
                                        <option value="Times New Roman">Times New Roman</option>
                                        <option value="Courier New">Courier New</option>
                                        <option value="Verdana">Verdana</option>
                                        <option value="Georgia">Georgia</option>
                                        <option value="Tahoma">Tahoma</option>
                                        <option value="Helvetica">Helvetica</option>
                                        <option value="Arial Black">Arial Black</option>
                                        <option value="Comic Sans MS">Comic Sans MS</option>
                                        <option value="Impact">Impact</option>
                                        <option value="Lucida Sans Unicode">Lucida Sans Unicode</option>
                                        <option value="Palatino Linotype">Palatino Linotype</option>
                                        <option value="Tahoma">Tahoma</option>
                                        <option value="Trebuchet MS">Trebuchet MS</option>
                                        <option value="Garamond">Garamond</option>
                                        <option value="Book Antiqua">Book Antiqua</option>
                                        <option value="Arial Narrow">Arial Narrow</option>
                                        <option value="Century Gothic">Century Gothic</option>
                                        <option value="Franklin Gothic Medium">Franklin Gothic Medium</option>
                                        <option value="Copperplate">Copperplate</option>
                                        <option value="Consolas">Consolas</option>
                                        <option value="Monaco">Monaco</option>
                                    </Input>
                                </FormGroup>
                            </div>
                        ) : (
                            <>
                                {''}
                            </>
                        )}

                        {isContentOne || isContentTwo ? (
                            <div>
                                <div>
                                    <Label className="form-label" for="content_1">
                                        <b>DESCRIPTION ONE</b>
                                    </Label>
                                    <Controller
                                        id="content_1"
                                        name="content_1"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                col={3}
                                                // style={{ width: '950px', }}
                                                type="textarea"
                                                placeholder="Enter  Content One"
                                                invalid={errors.content_1 && true}
                                            />
                                        )}
                                    />
                                    {errors.content_1 && <FormFeedback>{errors.content_1.message}</FormFeedback>}
                                </div>
                                <div>
                                    <Label className="form-label" for="content_2">
                                        <b>DESCRIPTION TWO</b>
                                    </Label>
                                    <Controller
                                        id="content_2"
                                        name="content_2"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                col={3}
                                                // style={{ width: '950px' }}
                                                type="textarea"
                                                placeholder="Enter  Sub Title"
                                                invalid={errors.content_2 && true}
                                            />
                                        )}
                                    />
                                    {errors.content_2 && <FormFeedback>{errors.content_2.message}</FormFeedback>}
                                </div>
                                <FormGroup>
                                    <Label for=" DescriptionColor">
                                        <b>DESCRIPTION COLOR</b>
                                    </Label>
                                    <Input
                                        id=" DescriptionColor"
                                        name="color"
                                        placeholder="color placeholder"
                                        type="color"
                                        onChange={(e) => setthirdcolor(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="Descriptionfont">
                                        <b>DESCRIPTION FONT</b>
                                    </Label>
                                    <Input
                                        id="Descriptionfont"
                                        name="select"
                                        type="number"
                                        onChange={(e) => setthirdfont(e.target.value)}
                                        defaultValue={thirdfont}
                                    >
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="fontFamilyInput">
                                        <b>DESCRIPTION FONT FAMILY</b>
                                    </Label>
                                    <Input
                                        id="fontFamilyInput"
                                        name="select"
                                        value={desfontfamily}
                                        type="select"
                                        onChange={(e) => setdesfontfamily(e.target.value)}
                                    >
                                        <option value="Arial">Arial</option>
                                        <option value="Times New Roman">Times New Roman</option>
                                        <option value="Courier New">Courier New</option>
                                        <option value="Verdana">Verdana</option>
                                        <option value="Georgia">Georgia</option>
                                        <option value="Tahoma">Tahoma</option>
                                        <option value="Helvetica">Helvetica</option>
                                        <option value="Arial Black">Arial Black</option>
                                        <option value="Comic Sans MS">Comic Sans MS</option>
                                        <option value="Impact">Impact</option>
                                        <option value="Lucida Sans Unicode">Lucida Sans Unicode</option>
                                        <option value="Palatino Linotype">Palatino Linotype</option>
                                        <option value="Tahoma">Tahoma</option>
                                        <option value="Trebuchet MS">Trebuchet MS</option>
                                        <option value="Garamond">Garamond</option>
                                        <option value="Book Antiqua">Book Antiqua</option>
                                        <option value="Arial Narrow">Arial Narrow</option>
                                        <option value="Century Gothic">Century Gothic</option>
                                        <option value="Franklin Gothic Medium">Franklin Gothic Medium</option>
                                        <option value="Copperplate">Copperplate</option>
                                        <option value="Consolas">Consolas</option>
                                        <option value="Monaco">Monaco</option>
                                    </Input>
                                </FormGroup>
                            </div>
                        ) : (
                            <>
                                {''}
                            </>
                        )}

                        {isStartDate || isEndDate ? (
                            <div>
                                <div >
                                    <Label className="form-label" for="react-flatpickr">
                                        <b>START DATE</b>
                                    </Label>

                                    <Flatpickr
                                        options={{ allowInput: true, dateFormat: 'd-m-Y' }}
                                        className="form-control"
                                        // defaultValue={new Date('2022-12-10')}
                                        // onChange={(e) => setEndDate(e.target.value)}
                                        onChange={(dates) => handleStartDateChange(dates)}
                                        value={startDate}
                                    />
                                </div>
                                <div>
                                    <Label className="form-label" for="react-flatpickr">
                                        <b>END DATE</b>
                                    </Label>

                                    <Flatpickr
                                        options={{ allowInput: true, dateFormat: 'd-m-Y' }}
                                        className="form-control"
                                        // defaultValue={new Date('2022-12-10')}
                                        // onChange={(e) => setStartDate(e.target.value)}
                                        onChange={(dates) => handleEndDateChange(dates)}
                                        value={endDate}
                                    />
                                </div>
                                <FormGroup>
                                    <Label for=" DateColor">
                                        <b>DATE COLOR</b>
                                    </Label>
                                    <Input
                                        id=" DateColor"
                                        name="color"
                                        placeholder="color placeholder"
                                        type="color"
                                        onChange={(e) => setdatecolor(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for=" DateFonts">
                                        <b>DATE FONT</b>
                                    </Label>
                                    <Input
                                        id="DateFonts"
                                        name="select"
                                        type="number"
                                        onChange={(e) => setdatefont(e.target.value)}
                                        defaultValue={datefont}
                                    >
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="fontFamilyInput">
                                        <b>DATE FONT FAMILY</b>
                                    </Label>
                                    <Input
                                        id="fontFamilyInput"
                                        name="select"
                                        value={datefontfamily}
                                        type="select"
                                        onChange={(e) => setdatefontfamily(e.target.value)}
                                    >
                                        <option value="Arial">Arial</option>
                                        <option value="Times New Roman">Times New Roman</option>
                                        <option value="Courier New">Courier New</option>
                                        <option value="Verdana">Verdana</option>
                                        <option value="Georgia">Georgia</option>
                                        <option value="Tahoma">Tahoma</option>
                                        <option value="Helvetica">Helvetica</option>
                                        <option value="Arial Black">Arial Black</option>
                                        <option value="Comic Sans MS">Comic Sans MS</option>
                                        <option value="Impact">Impact</option>
                                        <option value="Lucida Sans Unicode">Lucida Sans Unicode</option>
                                        <option value="Palatino Linotype">Palatino Linotype</option>
                                        <option value="Tahoma">Tahoma</option>
                                        <option value="Trebuchet MS">Trebuchet MS</option>
                                        <option value="Garamond">Garamond</option>
                                        <option value="Book Antiqua">Book Antiqua</option>
                                        <option value="Arial Narrow">Arial Narrow</option>
                                        <option value="Century Gothic">Century Gothic</option>
                                        <option value="Franklin Gothic Medium">Franklin Gothic Medium</option>
                                        <option value="Copperplate">Copperplate</option>
                                        <option value="Consolas">Consolas</option>
                                        <option value="Monaco">Monaco</option>
                                    </Input>
                                </FormGroup>
                            </div>
                        ) : (
                            <>

                            </>
                        )}

                        {isPlace ? (
                            <div>
                                <div>
                                    <Label className="form-label" for="place">
                                        <b>place</b>
                                    </Label>
                                    <Controller
                                        id="place"
                                        name="place"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                col={3}
                                                // style={{ width: '950px' }}
                                                type="text"
                                                placeholder="Enter  Sub Title"
                                                invalid={errors.place && true}
                                            />
                                        )}
                                    />
                                    {errors.place && <FormFeedback>{errors.place.message}</FormFeedback>}
                                </div>
                                <FormGroup>
                                    <Label for=" PlaceColor">
                                        <b>PLACE COLOR</b>
                                    </Label>
                                    <Input
                                        id="PlaceColor"
                                        name="color"
                                        placeholder="color placeholder"
                                        type="color"
                                        onChange={(e) => setareacolor(e.target.value)}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label for=" PlaceFonts">
                                        <b>PLACE FONT</b>
                                    </Label>
                                    <Input
                                        id="PlaceFonts"
                                        name="select"
                                        type="number"
                                        onChange={(e) => setareafont(e.target.value)}
                                        defaultValue={areafont}
                                    >
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="fontFamilyInput">
                                        <b>PLACE FONT FAMILY</b>
                                    </Label>
                                    <Input
                                        id="fontFamilyInput"
                                        name="select"
                                        value={placefontfamily}
                                        type="select"
                                        onChange={(e) => setplacefontfamily(e.target.value)}
                                    >
                                        <option value="Arial">Arial</option>
                                        <option value="Times New Roman">Times New Roman</option>
                                        <option value="Courier New">Courier New</option>
                                        <option value="Verdana">Verdana</option>
                                        <option value="Georgia">Georgia</option>
                                        <option value="Tahoma">Tahoma</option>
                                        <option value="Helvetica">Helvetica</option>
                                        <option value="Arial Black">Arial Black</option>
                                        <option value="Comic Sans MS">Comic Sans MS</option>
                                        <option value="Impact">Impact</option>
                                        <option value="Lucida Sans Unicode">Lucida Sans Unicode</option>
                                        <option value="Palatino Linotype">Palatino Linotype</option>
                                        <option value="Tahoma">Tahoma</option>
                                        <option value="Trebuchet MS">Trebuchet MS</option>
                                        <option value="Garamond">Garamond</option>
                                        <option value="Book Antiqua">Book Antiqua</option>
                                        <option value="Arial Narrow">Arial Narrow</option>
                                        <option value="Century Gothic">Century Gothic</option>
                                        <option value="Franklin Gothic Medium">Franklin Gothic Medium</option>
                                        <option value="Copperplate">Copperplate</option>
                                        <option value="Consolas">Consolas</option>
                                        <option value="Monaco">Monaco</option>
                                    </Input>
                                </FormGroup>
                            </div>
                        ) : (
                            <>

                            </>
                        )}


                        {isMainInCharge || isMainInChargeRole ? (
                            <div>
                                <div>
                                    <Label className="form-label" for="mainIncharge.name">
                                        <b>MAIN INCHARGE NAME</b>
                                    </Label>
                                    <Controller
                                        id="mainIncharge.name"
                                        name="mainIncharge.name"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                col={3}
                                                type="text"
                                                placeholder="Enter  name"
                                                invalid={errors.mainIncharge?.name && true}
                                            />
                                        )}
                                    />
                                    {errors.mainIncharge?.name && (
                                        <FormFeedback>{errors.mainIncharge?.name.message}</FormFeedback>
                                    )}
                                </div>
                                <div>
                                    <Label className="form-label" for="mainIncharge.role">
                                        <b>MAIN INCHARGE ROLE</b>
                                    </Label>
                                    <Controller
                                        id="mainIncharge.role"
                                        name="mainIncharge.role"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                col={3}
                                                type="text"
                                                placeholder="Enter  name"
                                                invalid={errors.mainIncharge?.role && true}
                                            />
                                        )}
                                    />
                                    {errors.mainIncharge?.role && (
                                        <FormFeedback>{errors.mainIncharge?.role.message}</FormFeedback>
                                    )}
                                </div>
                                <FormGroup>
                                    <Label for="  SignatureColor">
                                        <b>SIGNATURE COLOR</b>
                                    </Label>
                                    <Input
                                        id="SignatureColor"
                                        name="color"
                                        placeholder="color placeholder"
                                        type="color"
                                        onChange={(e) => setsigncolor(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="SignatureFonts">
                                        <b>SIGNATURE FONTS</b>
                                    </Label>
                                    <Input
                                        id="SignatureFonts"
                                        name="select"
                                        type="number"
                                        onChange={(e) => setsignfont(e.target.value)}
                                        defaultValue={signfont}
                                    >
                                    </Input>
                                    <FormGroup>
                                        <Label for="fontFamilyInput">
                                            <b>SIGNATURE FONT FAMILY</b>
                                        </Label>
                                        <Input
                                            id="fontFamilyInput"
                                            name="select"
                                            value={signfontfamily}
                                            type="select"
                                            onChange={(e) => setsignfontfamily(e.target.value)}
                                        >
                                            <option value="Arial">Arial</option>
                                            <option value="Times New Roman">Times New Roman</option>
                                            <option value="Courier New">Courier New</option>
                                            <option value="Verdana">Verdana</option>
                                            <option value="Georgia">Georgia</option>
                                            <option value="Tahoma">Tahoma</option>
                                            <option value="Helvetica">Helvetica</option>
                                            <option value="Arial Black">Arial Black</option>
                                            <option value="Comic Sans MS">Comic Sans MS</option>
                                            <option value="Impact">Impact</option>
                                            <option value="Lucida Sans Unicode">Lucida Sans Unicode</option>
                                            <option value="Palatino Linotype">Palatino Linotype</option>
                                            <option value="Tahoma">Tahoma</option>
                                            <option value="Trebuchet MS">Trebuchet MS</option>
                                            <option value="Garamond">Garamond</option>
                                            <option value="Book Antiqua">Book Antiqua</option>
                                            <option value="Arial Narrow">Arial Narrow</option>
                                            <option value="Century Gothic">Century Gothic</option>
                                            <option value="Franklin Gothic Medium">Franklin Gothic Medium</option>
                                            <option value="Copperplate">Copperplate</option>
                                            <option value="Consolas">Consolas</option>
                                            <option value="Monaco">Monaco</option>
                                        </Input>
                                    </FormGroup>
                                </FormGroup>
                            </div>
                        ) : (
                            <>
                            </>
                        )}
                        {isSubInChargeRole || isSubInCharge ? (
                            <div>
                                <div>
                                    <Label className="form-label" for="subIncharge.name">
                                        <b>SUB INCHARGE NAME</b>
                                    </Label>
                                    <Controller
                                        id="subIncharge.name"
                                        name="subIncharge.name"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                col={3}
                                                type="text"
                                                placeholder="Enter  name"
                                                invalid={errors.subIncharge?.name && true}
                                            />
                                        )}
                                    />
                                    {errors.subIncharge?.name && (
                                        <FormFeedback>{errors.subIncharge?.name.message}</FormFeedback>
                                    )}
                                </div>
                                <div>
                                    <Label className="form-label" for="subIncharge.role">
                                        <b>ROLE</b>
                                    </Label>
                                    <Controller
                                        id="subIncharge.role"
                                        name="subIncharge.role"
                                        defaultValue=""
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                col={3}
                                                type="text"
                                                placeholder="Enter  name"
                                                invalid={errors.subIncharge?.role && true}
                                            />
                                        )}
                                    />
                                    {errors.subIncharge?.role && (
                                        <FormFeedback>{errors.subIncharge?.role.message}</FormFeedback>
                                    )}
                                </div>
                                <FormGroup>
                                    <Label for=" RoleColor">
                                        <b>ROLE COLOR</b>
                                    </Label>
                                    <Input
                                        id="RoleColor"
                                        name="color"
                                        placeholder="color placeholder"
                                        type="color"
                                        onChange={(e) => setlastcolor(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="   RoleFonts">
                                        <b>ROLE FONT</b>
                                    </Label>
                                    <Input
                                        id="RoleFonts"
                                        name="select"
                                        type="number"
                                        onChange={(e) => setlastfont(e.target.value)}
                                        defaultValue={lastfont}
                                    >
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="fontFamilyInput">
                                        <b>ROLE FONT FAMILY</b>
                                    </Label>
                                    <Input
                                        id="fontFamilyInput"
                                        name="select"
                                        value={rolefontfamily}
                                        type="select"
                                        onChange={(e) => setrolefontfamily(e.target.value)}
                                    >
                                        <option value="Arial">Arial</option>
                                        <option value="Times New Roman">Times New Roman</option>
                                        <option value="Courier New">Courier New</option>
                                        <option value="Verdana">Verdana</option>
                                        <option value="Georgia">Georgia</option>
                                        <option value="Tahoma">Tahoma</option>
                                        <option value="Helvetica">Helvetica</option>
                                        <option value="Arial Black">Arial Black</option>
                                        <option value="Comic Sans MS">Comic Sans MS</option>
                                        <option value="Impact">Impact</option>
                                        <option value="Lucida Sans Unicode">Lucida Sans Unicode</option>
                                        <option value="Palatino Linotype">Palatino Linotype</option>
                                        <option value="Tahoma">Tahoma</option>
                                        <option value="Trebuchet MS">Trebuchet MS</option>
                                        <option value="Garamond">Garamond</option>
                                        <option value="Book Antiqua">Book Antiqua</option>
                                        <option value="Arial Narrow">Arial Narrow</option>
                                        <option value="Century Gothic">Century Gothic</option>
                                        <option value="Franklin Gothic Medium">Franklin Gothic Medium</option>
                                        <option value="Copperplate">Copperplate</option>
                                        <option value="Consolas">Consolas</option>
                                        <option value="Monaco">Monaco</option>
                                    </Input>
                                </FormGroup>
                            </div>
                        ) : (
                            <>

                            </>
                        )}

                        {/* <FormGroup>
                            <Label for="  SignatureColor">
                                <b>CANDIDATE COLOR</b>
                            </Label>
                            <Input
                                id="SignatureColor"
                                name="color"
                                placeholder="color placeholder"
                                type="color"
                                onChange={(e) => setsigncolor(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>

                            <Label for="SignatureFonts">
                                <b>CANDIDATE FONTS</b>
                            </Label>
                            <Input
                                id="SignatureFonts"
                                name="select"
                                type="number"
                                onChange={(e) => setsignfont(e.target.value)}
                                defaultValue={signfont}
                            >
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="fontFamilyInput">
                                <b> CANDIDATE FONT FAMILY</b>
                            </Label>
                            <Input
                                id="fontFamilyInput"
                                name="select"
                                value={signfontfamily}
                                type="select"
                                onChange={(e) => setsignfontfamily(e.target.value)}
                            >
                                <option value="Arial">Arial</option>
                                <option value="Times New Roman">Times New Roman</option>
                                <option value="Courier New">Courier New</option>
                                <option value="Verdana">Verdana</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Tahoma">Tahoma</option>
                                <option value="Helvetica">Helvetica</option>
                                <option value="Arial Black">Arial Black</option>
                                <option value="Comic Sans MS">Comic Sans MS</option>
                                <option value="Impact">Impact</option>
                                <option value="Lucida Sans Unicode">Lucida Sans Unicode</option>
                                <option value="Palatino Linotype">Palatino Linotype</option>
                                <option value="Tahoma">Tahoma</option>
                                <option value="Trebuchet MS">Trebuchet MS</option>
                                <option value="Garamond">Garamond</option>
                                <option value="Book Antiqua">Book Antiqua</option>
                                <option value="Arial Narrow">Arial Narrow</option>
                                <option value="Century Gothic">Century Gothic</option>
                                <option value="Franklin Gothic Medium">Franklin Gothic Medium</option>
                                <option value="Copperplate">Copperplate</option>
                                <option value="Consolas">Consolas</option>
                                <option value="Monaco">Monaco</option>
                            </Input>
                        </FormGroup> */}


                        <FormGroup>
                            <Label for="TopLogosize">
                                <b>TOP LOGO SIZE</b>
                            </Label>
                            <Input
                                id="TopLogosize"
                                name="select"
                                type="number"
                                value={headlogo}
                                onChange={(e) => setheadlogo(e.target.value)}
                                defaultValue={headlogo}
                            >
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="TopLogosize">
                                <b>LEFT SIGN SIZE</b>
                            </Label>
                            <Input
                                id="TopLogosize"
                                name="select"
                                type="number"
                                value={leftsign}
                                onChange={(e) => setleftsign(e.target.value)}
                                defaultValue={leftsign}
                            >
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="TopLogosize">
                                <b>RIGHT SIGN SIZE</b>
                            </Label>
                            <Input
                                id="TopLogosize"
                                name="select"
                                type="number"
                                value={rightsign}
                                onChange={(e) => setrightsign(e.target.value)}
                                defaultValue={rightsign}
                            >
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="TopLogosize">
                                <b>BOTTOM IMAGE SIZE</b>
                            </Label>
                            <Input
                                id="TopLogosize"
                                name="select"
                                type="number"
                                value={bottomimg}
                                onChange={(e) => setbottomimg(e.target.value)}
                                defaultValue={rightsign}
                            >
                            </Input>
                        </FormGroup>
                        {/* <FormGroup>
                            <Label for="TopLogosize">
                                <b>BANNER IMAGE SIZE</b>
                            </Label>
                            <Input
                                id="TopLogosize"
                                name="select"
                                type="number"
                                value={banner}
                                onChange={(e) => setbanner(e.target.value)}
                                defaultValue={banner}
                            >
                            </Input>
                        </FormGroup> */}
                        <FormGroup>
                            <Label for="exampleFile">
                                FILE
                            </Label>
                            <Input
                                id="exampleFile"
                                name="file"
                                type="file"
                            />
                        </FormGroup>
                        <Button>
                            Submit
                        </Button>
                    </Form>
                </div>
            </div >
        </div >
    );
}

export default CreateCertificate;
