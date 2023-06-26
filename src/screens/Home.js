import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'


export default function Home() {


    const [search, setSearch] = useState('')

    const [drinkCat, setDrinkCat] = useState([]);
    const [drinkItem, setDrinkItem] = useState([]);

    const loadData = async () => {
        let response = await fetch('http://localhost:5000/api/drinkData', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        })
        response = await response.json();
        setDrinkItem(response[0]);
        setDrinkCat(response[1]);
        // console.log(response[0], response[1]);


    }

    useEffect(() => {
        loadData()
    }, [])


    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>

                    <div className="carousel-inner " id='carousel'>
                        <div className=" carousel-caption  " style={{ zIndex: "9" }}>
                            <div className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
                                <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                                {/* <button className="btn text-white bg-success" type="submit">Search</button> */}
                            </div>
                        </div>
                        <div className="carousel-item active" >
                            <img src="https://source.unsplash.com/random/900x700/?beer" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?beer" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?beer" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <div className='container'>
                {
                    drinkCat !== []
                        ? drinkCat.map((fetchedData) => {
                            return (<div className='row mb-3'>
                                <div  key={fetchedData._id} className='fs-3 m-3'>
                                    {fetchedData.CategoryName}

                                </div>
                                <hr />
                                {drinkItem !== []
                                    ?
                                    drinkItem.filter((item) => item.CategoryName === (fetchedData.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                                        .map(filterItems => {
                                            return (
                                                <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                                    <Card drinkItem = {filterItems}
                                                        options={filterItems.options}
                                                        
                                                    ></Card>
                                                    <br />
                                                    <br />
                                                    <br />
                                                    <br />
                                                </div>
                                            )
                                        })
                                    : <div>"No Data found"</div>}
                            </div>
                            )
                        })
                        : ""
                }

            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}
