import React, { useEffect, useRef, useState } from 'react'
import { Edit, Grid, Upload } from 'react-feather';
import { Card, Row, Col, Form, FormFeedback, Input, Select, FormGroup, Label, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useForm, Controller, } from "react-hook-form"
import NavBar from './NavBar';
import axios from "axios"
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom'





const VisitingCard = () => {



    const [coverimg, setcoverimg] = useState(
        "https://img.freepik.com/free-vector/green-gradient-background-modern-design_343694-3966.jpg?w=1380&t=st=1704370332~exp=1704370932~hmac=87a471e1e9916afa021baf66eabc7e1d6261877917521f9bc1c5559066692272"
    )

    const [mainLogo, setMainLogo] = useState(
        'https://img.freepik.com/free-vector/colorful-bird-illustration-gradient_343694-1741.jpg?w=826&t=st=1704201362~exp=1704201962~hmac=9ba2d6b722cf8cdead2c5d2e4a8f4defcfdc73ad2d0dd05d8d2e37dfd666ce1a'
    );



    const [template, setTemplate] = useState()

    const templates = async () => {
        try {
            const response = await axios.get('https://apiprinton.aata.in/auth/visiting/card/background')
            setTemplate(response?.data?.result)
            console.log(response)

        } catch (error) {

        }
    }
    useEffect(() => {
        templates()
    }, [])




    const handlemainLogoUpload = async (e) => {
        if (e.target.files && e.target.files[0]) {
            setMainLogo(URL.createObjectURL(e.target.files[0]));
        }
        if (e.target.files) {
            try {
                const formData = new FormData();
                formData.append('file', e.target.files[0]);

                const uploadData = await coverimg(formData);
                if (uploadData && uploadData.result && uploadData.result.length) {
                    setMainLogo(uploadData.result[0].location);
                }
            } catch (error) {
                toast.error('Something went wrong...');
            }
        }
    };


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
        companyname: 'RED SOLID',
        name: 'RAJESHKUMAR',
        desc: 'change the style',
        number1: '834789****',
        number2: '984207****',
        address: '7a,omr road ,thuraippakkam ,chennai-632001',
        social1: 'Rajeshkumar',
        social2: '@rajeshyogan',
        whatsapp: '9778187***'

    };



    const {
        reset,
        control,
        setValue,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm({ mode: 'onChange', resolver: yupResolver(certificateSchema), defaultValues });

    const watchedTitle = watch('companyname');
    const watchedName = watch('name');
    const watcheddesc = watch('desc')
    const watchednumber1 = watch('number1')
    const watchednumber2 = watch('number2')
    const watchedaddress = watch('address')
    const watchedssocial1 = watch('social1')
    const wacthedurl2 = watch('url2')
    const watchedwhatsapp = watch('whatsapp')


    // 
    const inputRefMainLogo = useRef(null);

    const [comcolor, setComcolor] = useState('white')
    const [namecolor, setNameColor] = useState('')
    const [addresscolor, setAddressColor] = useState('')
    const [descriptioncolor, setDescriptionColor] = useState('')
    const [companyfontfamily, setcompanyfontfamily] = useState('')
    const [comfontsize, setComFontSize] = useState('40')
    const [namesize, setNameSize] = useState('')
    const [descriptionsize, setdescriptionsize] = useState('')
    const [descriptionfontfamily, setdescriptionfontfamily] = useState('')
    const [frontlogo, setfrontlogo] = useState('100')
    const [namefontfamily, setNameFontFamily] = useState('')
    const [addressfontsize, setAdderssFontsize] = useState('')
    const [addressfontfamily, setAddressFontFamily] = useState('')
    const [numbercolor, setNumberColor] = useState('')
    const [numbersize, setNumbersize] = useState('20')
    const [number2size, setNumber2size] = useState('20')
    // const [socialfonts, setSocialFonts] = useState('')



    const handleResetPage = () => {
        window.location.reload(false);
    };
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documenttitle: 'emp-data',
        onAfterPrint: () => alert('Print success')
    });






    const [companyNameDropdownOpen, setCompanyNameDropdownOpen] = useState(false);

    const toggleCompanyNameDropdown = () => {
        setCompanyNameDropdownOpen(!companyNameDropdownOpen);
    };

    const [LogoDropdownOpen, setLogoDropdownOpen] = useState(false);

    const toggleLogoDropdown = () => {
        setLogoDropdownOpen(!LogoDropdownOpen);
    };

    const [NameDropdownOpen, setNameDropdownOpen] = useState(false);

    const toggleNameDropdown = () => {
        setNameDropdownOpen(!NameDropdownOpen);
    };

    const [DescDropdownOpen, setDescDropdownOpen] = useState(false);

    const toggleDescDropdown = () => {
        setDescDropdownOpen(!DescDropdownOpen);
    };


    const [AddressDropdownOpen, setAddressDropdownOpen] = useState(false);

    const toggleAddressDropdown = () => {
        setAddressDropdownOpen(!AddressDropdownOpen);
    };

    const [NumberDropdownopen, setNumberDropdownOpen] = useState(false);

    const toggleNumberDropdown = () => {
        setNumberDropdownOpen(!NumberDropdownopen)
    }

    const [NumbertwoDropdownopen, setNumbertwoDropdownOpen] = useState(false);

    const toggleNumbertwoDropdown = () => {
        setNumbertwoDropdownOpen(!NumbertwoDropdownopen)
    }


    const [urlDropdownopen, setUrlDropdownOpen] = useState(false);

    const toggleUrlDropdown = () => {
        setUrlDropdownOpen(!urlDropdownopen)
    }





    const navigate = useNavigate()


    return (
        <div style={{ fontFamily: 'arialnarrow', fontWeight: '700', backgroundColor: 'aliceblue', height: '100vh' }}>
            {/* <NavBar /> */}
            <div style={{ backgroundColor: 'black', height: '30px' }}>

            </div>

            <div className="d-flex " style={{ justifyContent: 'space-between', padding: '5px' }}>
                <div>
                    <Button onClick={() => navigate('/')} style={{ border: 'none', height: '40px', width: '100px', color: 'white', backgroundColor: 'black', margin: '10px' }}>home</Button>
                    <Button onClick={() => navigate('/CardCollection')} style={{ border: 'none', height: '40px', width: '100px', color: 'white', backgroundColor: 'black', margin: '10px' }}>Template</Button>
                </div>

                <div>
                    <Button className="me-3 " style={{ color: 'white', backgroundColor: 'black', height: '40px', width: '100px' }} outline color="white" onClick={handlePrint}>
                        Print
                    </Button>

                    <Button className='' style={{ color: 'white', backgroundColor: 'black', height: '40px', width: '100px' }} outline color="white" type="reset" onClick={handleResetPage}>
                        Reset
                    </Button>
                </div>
            </div>


            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '3%' }}>

                <div >
                    <h3 style={{ textAlign: 'center' }} ></h3>
                    <div style={{ padding: '10px', height: '800px', width: '400px', textAlign: 'center', overflowY: 'auto' }}>
                        {template?.map((items, i) => (
                            <img onClick={() => setcoverimg(items?.imgUrl)} style={{
                                padding: '10px',


                            }} width={250} key={i} src={items.imgUrl} />
                        ))}

                    </div>



                </div>
                <div ref={componentRef} style={{}}>

                    <Card className='shadow' style={{ border: 'none', height: '290px', width: '460px', margin: '10px', padding: '10px', backgroundImage: `url(${coverimg})`, backgroundSize: 'cover' }}>
                        <div style={{ textAlign: 'center', color: 'white', paddingTop: '10%' }}>
                            <div className="d-flex" style={{ justifyContent: "center" }}>
                                <img src={mainLogo} style={{ textAlign: "center", height: `${frontlogo}px`, width: 'auto' }} alt="" />
                                <div className="">

                                    <div className="d-flex" style={{ cursor: 'pointer' }}>
                                        <input
                                            style={{ display: 'none' }}
                                            type="file"
                                            ref={inputRefMainLogo}
                                            onChange={handlemainLogoUpload}
                                        />
                                        <span
                                            onClick={() => {
                                                inputRefMainLogo?.current?.click();
                                            }}
                                        >
                                            <span style={{ color: 'green' }}>
                                                <Upload size={20} />
                                            </span>
                                        </span>
                                    </div>

                                </div>
                            </div>

                            <h1 style={{ color: `${comcolor}`, fontSize: `${comfontsize}px`, fontFamily: `${companyfontfamily}` }}>{watchedTitle}</h1>
                            <h6 style={{ color: `${descriptioncolor}`, fontSize: `${descriptionsize}px`, fontFamily: `${descriptionfontfamily}` }} >{watcheddesc}</h6>



                        </div>
                    </Card>


                    {/* back card  */}
                    <Card className='shadow' style={{ border: 'none', height: '290px', width: '460px', margin: '10px', padding: '10px', backgroundImage: `url(${coverimg})`, backgroundSize: 'cover' }}>

                        <div className='d-flex' style={{}}>

                            <div style={{ textAlign: 'center', color: 'white', padding: '10%' }}>
                                <div className="d-flex" style={{ justifyContent: "center" }}>
                                    <img src={mainLogo} height={80} style={{}} alt="" />
                                    <div className="">

                                        <div className="d-flex" style={{ cursor: 'pointer' }}>
                                            <input
                                                style={{ display: 'none' }}
                                                type="file"
                                                ref={inputRefMainLogo}
                                                onChange={handlemainLogoUpload}
                                            />
                                            <span
                                                onClick={() => {
                                                    inputRefMainLogo?.current?.click();
                                                }}
                                            >
                                                <span style={{ color: 'green' }}>
                                                    <Upload size={20} />
                                                </span>
                                            </span>
                                        </div>

                                    </div>

                                </div>

                                <h6 className='pt-3' style={{ paddingRight: "15px", color: `${comcolor}` }} >{watchedTitle}</h6>

                            </div>


                            <div style={{ textAlign: 'start', color: 'white', paddingTop: '4%' }}>

                                <h2 style={{ color: `${namecolor}`, fontFamily: `${namefontfamily}`, fontSize: `${namesize}px` }} >{watchedName}</h2>
                                <h5 style={{ color: `${addresscolor}`, fontSize: `${addressfontsize}px`, fontFamily: `${addressfontfamily}` }}>{watchedaddress}</h5>
                                <h6 style={{ color: `${numbercolor}`, fontSize: `${numbersize}px` }}>ph:{watchednumber1}</h6>
                                <h6 style={{ color: `${numbercolor}`, fontSize: `${number2size}px` }}>ph:{watchednumber2}</h6>

                            </div>

                        </div>
                        <div className='d-flex  ' style={{
                            justifyContent: 'space-between',
                            paddingTop: "9%", color: 'white'

                        }}>

                            <h6>{watchedssocial1}</h6>
                            <h6>{wacthedurl2}</h6>
                            <h6>{watchedwhatsapp}</h6>
                        </div>


                    </Card>
                </div>
                <div style={{
                    padding: '10px', paddingRight: '20px'
                }} >
                    <div className='d-flex ' style={{ overflowY: 'auto', height: '800px', width: '400px' }}>




                        <div style={{ backgroundColor: 'aliceblue', padding: "10px" }}>
                            <Form >

                                <div className="mb-1">

                                    <Label className="form-label" for="Companynamesize">
                                        Company logo size
                                    </Label>
                                    <Dropdown isOpen={LogoDropdownOpen} toggle={toggleLogoDropdown}>
                                        <DropdownToggle caret style={{ width: '370px', }}>
                                            Select Company logo
                                        </DropdownToggle>
                                        <DropdownMenu style={{ border: '2px', borderColor: 'black' }} >
                                            <div className="mb-1" style={{ margin: '10px', }}>
                                                <Label className="form-label" for="companyname">
                                                    Company logo
                                                </Label>
                                                <Input
                                                    style={{ width: '350px' }}

                                                    type="number"
                                                    placeholder="Companynamesize"
                                                    onChange={(e) => setfrontlogo(e.target.value)}
                                                    defaultValue={frontlogo}
                                                />
                                            </div>
                                        </DropdownMenu>
                                    </Dropdown>



                                </div>




                                <div className="mb-1" >
                                    <Label className="form-label" for="companyname">
                                        Company name
                                    </Label>
                                    <Dropdown isOpen={companyNameDropdownOpen} toggle={toggleCompanyNameDropdown}>
                                        <DropdownToggle caret style={{ width: '370px' }}>
                                            Select Company Name
                                        </DropdownToggle>
                                        <DropdownMenu style={{ border: '2px', borderColor: 'black' }}>
                                            <div className="mb-1" style={{ margin: '10px', }} >
                                                <Label className="form-label" for="companyname">
                                                    Company name
                                                </Label>
                                                <Controller
                                                    id="companyname"
                                                    name="companyname"
                                                    defaultValue=""
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input
                                                            style={{ width: '350px', }}
                                                            {...field}
                                                            type="text"
                                                            placeholder="Enter  Template Name"
                                                            invalid={errors.companyname && true}
                                                        />
                                                    )}
                                                />
                                                {errors.companyname && <FormFeedback>{errors.companyname.message}</FormFeedback>}
                                            </div>


                                            <div className="mb-1 " style={{ margin: '10px', }}>
                                                <Label className="form-label" for="companyNameColor">
                                                    Company name color
                                                </Label>

                                                <Input
                                                    style={{ width: '350px' }}
                                                    defaultValue={comcolor}
                                                    type="color"
                                                    placeholder="Enter  Template Name"
                                                    onChange={(e) => setComcolor(e.target.value)}
                                                />
                                            </div>




                                            <div className="mb-1" style={{ margin: '10px', }}>
                                                <Label className="form-label" for="Companynamesize">
                                                    Company name size
                                                </Label>

                                                <Input
                                                    style={{ width: '350px' }}
                                                    defaultValue={comfontsize}
                                                    type="number"
                                                    placeholder="Enter  Template Name"
                                                    onChange={(e) => setComFontSize(e.target.value)}
                                                />
                                            </div>

                                            <div className="mb-1" style={{ margin: '10px', }}>
                                                <Label className="form-label" for="Companynamesize">
                                                    Company name Font
                                                </Label>

                                                <Input
                                                    style={{ width: '350px' }}

                                                    type="select"
                                                    placeholder="Enter  Template Name"
                                                    onChange={(e) => setcompanyfontfamily(e.target.value)}

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
                                            </div>


                                        </DropdownMenu>
                                    </Dropdown>




                                </div>
                                {/* name Dropdown */}


                                <div className="mb-1" >


                                    <Label className="form-label" for="companyname">
                                        Name
                                    </Label>
                                    <Dropdown isOpen={NameDropdownOpen} toggle={toggleNameDropdown}>
                                        <DropdownToggle caret style={{ width: '370px' }}>
                                            Name
                                        </DropdownToggle>
                                        <DropdownMenu style={{ border: '2px', borderColor: 'black' }}>
                                            <div className="mb-1">
                                                <Label className="form-label" for="name" style={{ margin: '10px', }}>
                                                    Name
                                                </Label>
                                                <Controller
                                                    id="name"
                                                    name="name"
                                                    defaultValue=""
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input
                                                            style={{ width: '350px' }}
                                                            {...field}
                                                            type="text"
                                                            placeholder="Enter  Template Name"
                                                            invalid={errors.name && true}

                                                        />

                                                    )}

                                                />
                                                {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}

                                            </div>

                                            <div className="mb-1" style={{ margin: '10px', }}>
                                                <Label className="form-label" for="NameColor">
                                                    Name color
                                                </Label>

                                                <Input
                                                    style={{ width: '350px' }}

                                                    type="color"
                                                    placeholder="Enter  Template Name"
                                                    onChange={(e) => setNameColor(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-1" style={{ margin: '10px', }}>
                                                <Label className="form-label" for="Namesize">
                                                    Name size
                                                </Label>

                                                <Input
                                                    style={{ width: '350px' }}

                                                    type="number"
                                                    placeholder="Name size"
                                                    onChange={(e) => setNameSize(e.target.value)}

                                                />
                                            </div>

                                            <div className="mb-1" style={{ margin: '10px', }}>
                                                <Label className="form-label" for="namefontfamily">
                                                    Name Font Family
                                                </Label>

                                                <Input
                                                    style={{ width: '350px' }}

                                                    type="select"
                                                    placeholder="fontfamily"
                                                    onChange={(e) => setNameFontFamily(e.target.value)}

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
                                            </div>

                                        </DropdownMenu>
                                    </Dropdown>

                                </div>




                                <div className="mb-1" >


                                    <Label className="form-label" for="Description">
                                        Description
                                    </Label>
                                    <Dropdown isOpen={DescDropdownOpen} toggle={toggleDescDropdown}>
                                        <DropdownToggle caret style={{ width: '370px' }}>
                                            Description
                                        </DropdownToggle>
                                        <DropdownMenu style={{ border: '2px', borderColor: 'black' }}>

                                            <div className="mb-1" style={{ padding: '10px' }}>
                                                <Label className="form-label" for="desc">
                                                    Description
                                                </Label>
                                                <Controller
                                                    id="desc"
                                                    name="desc"
                                                    defaultValue=""
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input
                                                            style={{ width: '350px' }}
                                                            {...field}
                                                            type="textarea"
                                                            placeholder="Enter your description"
                                                            invalid={errors.desc && true}
                                                        />
                                                    )}
                                                />
                                                {errors.desc && <FormFeedback>{errors.desc.message}</FormFeedback>}
                                            </div>
                                            <div className="mb-1" style={{ padding: '10px' }}>
                                                <Label className="form-label" for="Description">
                                                    Description color
                                                </Label>

                                                <Input
                                                    style={{ width: '350px' }}

                                                    type="color"
                                                    placeholder="Enter  Template Name"
                                                    onChange={(e) => setDescriptionColor(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-1" style={{ padding: '10px' }}>
                                                <Label className="form-label" for="Description">
                                                    Description Font Size
                                                </Label>

                                                <Input
                                                    style={{ width: '350px' }}

                                                    type="number"
                                                    placeholder="Enter  Template Name"
                                                    onChange={(e) => setdescriptionsize(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-1" style={{ padding: '10px' }}>
                                                <Label className="form-label" for="Description">
                                                    Description Font Family
                                                </Label>

                                                <Input
                                                    style={{ width: '350px' }}

                                                    type="select"
                                                    placeholder="Enter  Template Name"
                                                    onChange={(e) => setdescriptionfontfamily(e.target.value)}
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
                                            </div>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>



                                <div className="mb-1" >
                                    <Label className="form-label" for="Address">
                                        Address
                                    </Label>
                                    <Dropdown isOpen={AddressDropdownOpen} toggle={toggleAddressDropdown}>
                                        <DropdownToggle caret style={{ width: '370px' }}>
                                            Address
                                        </DropdownToggle>
                                        <DropdownMenu style={{ border: '2px', borderColor: 'black' }}>

                                            <div className="mb-1" style={{ padding: '10px' }}>
                                                <Label className="form-label" for="address">
                                                    Address
                                                </Label>
                                                <Controller
                                                    id="address"
                                                    name="address"
                                                    defaultValue=""
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input
                                                            style={{ width: '350px' }}
                                                            {...field}
                                                            type="textarea"
                                                            placeholder="Enter  your address"
                                                            invalid={errors.address && true}
                                                        />
                                                    )}
                                                />
                                                {errors.address && <FormFeedback>{errors.address.message}</FormFeedback>}
                                            </div>
                                            <div className="mb-1" style={{ padding: '10px' }}>
                                                <Label className="form-label" for="AddressColor">
                                                    Address color
                                                </Label>

                                                <Input
                                                    style={{ width: '350px' }}

                                                    type="color"
                                                    placeholder="Enter  Template Name"
                                                    onChange={(e) => setAddressColor(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-1" style={{ padding: '10px' }}>
                                                <Label className="form-label" for="Addressfontsize">
                                                    Addressfontsize
                                                </Label>

                                                <Input
                                                    style={{ width: '350px' }}

                                                    type="number"
                                                    placeholder="Addressfontsize"
                                                    onChange={(e) => setAdderssFontsize(e.target.value)}
                                                />
                                            </div>

                                            <div className="mb-1" style={{ padding: '10px' }}>
                                                <Label className="form-label" for="Description">
                                                    Address Fonts
                                                </Label>

                                                <Input
                                                    style={{ width: '350px' }}

                                                    type="select"
                                                    placeholder="AddressFontFamily"
                                                    onChange={(e) => setAddressFontFamily(e.target.value)}
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
                                            </div>

                                        </DropdownMenu>
                                    </Dropdown>





                                </div>



                                <div className="mb-1">
                                    <Label className="form-label" for="number1">
                                        Number
                                    </Label>
                                    <Dropdown isOpen={NumberDropdownopen} toggle={toggleNumberDropdown}>
                                        <DropdownToggle caret style={{ width: '370px' }}>
                                            Number
                                        </DropdownToggle>
                                        <DropdownMenu style={{ border: '2px', borderColor: 'black' }}>

                                            <div className="mb-1" style={{ padding: '10px' }}>
                                                <Label className="form-label" for="number1">
                                                    Number
                                                </Label>
                                                <Controller
                                                    id="number1"
                                                    name="number1"
                                                    defaultValue=""
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input
                                                            style={{ width: '350px' }}
                                                            {...field}
                                                            type="number"
                                                            placeholder="Enter your number"
                                                            invalid={errors.number1 && true}
                                                        />
                                                    )}
                                                />
                                                {errors.number1 && <FormFeedback>{errors.number1.message}</FormFeedback>}
                                            </div>
                                            <div className="mb-1" style={{ padding: '10px' }}>
                                                <Label className="form-label" for="numberColor">
                                                    number color
                                                </Label>

                                                <Input
                                                    style={{ width: '350px' }}

                                                    type="color"
                                                    placeholder="Enter  Template Name"
                                                    onChange={(e) => setNumberColor(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-1" style={{ padding: '10px' }}>
                                                <Label className="form-label" for="Numbersize">
                                                    Numbersize
                                                </Label>

                                                <Input
                                                    style={{ width: '350px' }}

                                                    type="number"
                                                    placeholder="Numbersize"
                                                    onChange={(e) => setNumbersize(e.target.value)}
                                                />
                                            </div>


                                        </DropdownMenu>
                                    </Dropdown>
                                </div>

                                <div className="mb-1"  >
                                    <Label className="form-label" for="number2">
                                        Number2
                                    </Label>
                                    <Dropdown isOpen={NumbertwoDropdownopen} toggle={toggleNumbertwoDropdown}>
                                        <DropdownToggle caret style={{ width: '370px' }}>
                                            Number2
                                        </DropdownToggle>
                                        <DropdownMenu style={{ border: '2px', borderColor: 'black' }}>

                                            <div className="mb-1" style={{ padding: '10px' }}>
                                                <Label className="form-label" for="number2">
                                                    Number2
                                                </Label>
                                                <Controller
                                                    id="number2"
                                                    name="number2"
                                                    defaultValue=""
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input
                                                            style={{ width: '350px' }}
                                                            {...field}
                                                            type="number"
                                                            placeholder="Enter your number"
                                                            invalid={errors.number1 && true}
                                                        />
                                                    )}
                                                />
                                                {errors.number2 && <FormFeedback>{errors.number2.message}</FormFeedback>}
                                            </div>
                                            <div className="mb-1" style={{ padding: '10px' }}>
                                                <Label className="form-label" for="numberColor">
                                                    number color
                                                </Label>

                                                <Input
                                                    style={{ width: '350px' }}

                                                    type="color"
                                                    placeholder="Enter  Template Name"
                                                    onChange={(e) => setNumberColor(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-1" style={{ padding: '10px' }}>
                                                <Label className="form-label" for="Number2size">
                                                    Number2size
                                                </Label>

                                                <Input
                                                    style={{ width: '350px' }}

                                                    type="number"
                                                    placeholder="Numbersize"
                                                    onChange={(e) => setNumber2size(e.target.value)}
                                                />
                                            </div>


                                        </DropdownMenu>
                                    </Dropdown>
                                </div>


                                <div className="mb-1" >
                                    <Label className="form-label" for="social1">
                                        socialmedia
                                    </Label>
                                    <Dropdown isOpen={urlDropdownopen} toggle={toggleUrlDropdown}>
                                        <DropdownToggle style={{ width: '370px' }}>
                                            socialmedia
                                        </DropdownToggle>
                                        <DropdownMenu style={{ border: '2px', borderColor: 'black' }}>



                                            <div className="mb-1">
                                                <Label className="form-label" for="social1">
                                                    socialmedia
                                                </Label>
                                                <Controller
                                                    id=" social1"
                                                    name=" social1"
                                                    defaultValue=""
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input
                                                            style={{ width: '350px', }}
                                                            {...field}
                                                            type="text"
                                                            placeholder="socialmedialink"
                                                            invalid={errors.social1 && true}



                                                        />
                                                    )}
                                                />
                                                {errors.social1 && <FormFeedback>{errors.social1.message}</FormFeedback>}
                                            </div>

                                        </DropdownMenu>
                                    </Dropdown>
                                </div>





                            </Form>
                        </div>






                    </div>
                </div>
            </div >



        </div >

    )
}

export default VisitingCard
