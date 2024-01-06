
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'reactstrap'

import "../components/index.css"
import NavBar from './visitingcard/NavBar'




import CreateCertificate from './template'

function CertificateIndex() {

    const navigate = useNavigate()

    return (

        <div>

            <NavBar />
            <div className='banner' style={{ display: 'grid', placeItems: 'center', alignContent: 'space-evenly', height: '100vh' }}  >

                <div>
                    <div className="e-card playing">
                        <div className="image"></div>

                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>


                        <div className="infotop">
                            EASY TO MAKE
                            <br></br>
                            <div className="name">MAKE YOUR DESIGN</div>
                        </div>


                    </div>
                    <div className='d-flex'>
                        <Button className='button' onClick={() => navigate('/generate')} style={{ border: 'none', backgroundColor: 'black', marginRight: '60px' }}> certificate</Button>



                        <Button className='button' onClick={() => navigate('/visitingcard')} style={{ border: 'none', backgroundColor: 'black', }}>
                            visitingcard
                        </Button>
                    </div>

                </div>






            </div>

            <div >
                <CreateCertificate />


            </div>
        </div>



    )
}

export default CertificateIndex
