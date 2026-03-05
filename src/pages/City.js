import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchLocations, fetchParkings } from '../api/api'
import CityCard from '../components/CityCard/CityCard'

import './../css/city.scss'

const City = () => {
    const user = useSelector((state) => state.user)

    const [locations, setLocations]=useState([]);
    const [ownerParkings, setOwnerParkings] = useState([])
    const [ownerView, setOwnerView] = useState('all')
    //const [search, setSearch]=useState(false);

    const [searchForm, setSearchForm] = useState({
        city: '',
        country: ''
    })

    const getCityKey = ({ city = '', country = '' }) => `${city}`.trim().toLowerCase() + '|' + `${country}`.trim().toLowerCase()

    useEffect(() => {
        fetchLocations({ setLocations })
        if (user?.type === 'owner') {
            fetchParkings({ user_id: user?._id, setParkings: setOwnerParkings })
        }
    }, [])

    const filterLocationsByOwnerView = (items) => {
        if (user?.type !== 'owner') {
            return items || []
        }

        const ownedCitySet = new Set((ownerParkings || []).map((item) => getCityKey({ city: item?.city, country: item?.country })))

        if (ownerView === 'hosted') {
            return (items || []).filter((item) => ownedCitySet.has(getCityKey(item)))
        }

        if (ownerView === 'others') {
            return (items || []).filter((item) => !ownedCitySet.has(getCityKey(item)))
        }

        return items || []
    }

    const visibleLocations = filterLocationsByOwnerView(locations)

    const cityCards = () => {
        console.log("locations inside citycards",locations)
        return visibleLocations && visibleLocations.map((item, index) => (
            <div className='col-md-4 cityCard' key={index}>
                <CityCard
                    location={item} 
                    // onClick={() => navigate('/address', { state: { parking: item } })}
                    />
            </div>
        ))
    }

    const handleSearchForm = ({ key, value }) => {
        setSearchForm({ ...searchForm, [key]: value })
    }


    function handleSearch() {
        setLocations([])
        fetchLocations({ setLocations, ...searchForm})
            
    }

    // const cityCards = () => {
    //     return (
    //         <div>
    //             <div className='col-md-4 cityCard'>
    //                 <CityCard city={city} country={country}/>
    //             </div>
    //         </div>
            
    //     )
    // }


    return (
        <div className='container'>
            <h1 className='mt-5'>Search Cities</h1>
            <div className='card p-4 mt-5 searchCity'>
                <div className='row g-3 d-flex align-items-center'>
                    {user?.type === 'owner' && (
                        <div className='col-md-3 city'>
                            <select className='form-select' value={ownerView} onChange={(e) => setOwnerView(e.target.value)}>
                                <option value='all'>All Cities</option>
                                <option value='hosted'>Cities I Host In</option>
                                <option value='others'>Cities by Other Hosts</option>
                            </select>
                        </div>
                    )}
                    <div className='col-md-3 city'>
                        <input type="text" placeholder='City' className='form-control' value={searchForm?.city} onChange={(e) => handleSearchForm({ key: 'city', value: e.target.value })} />
                    </div>
                    <div className='col-md-3 city'>
                        <input type="text" placeholder='Country' className='form-control' value={searchForm?.country} onChange={(e) => handleSearchForm({ key: 'country', value: e.target.value })} />
                    </div>
                    
                    <div className='col-md-3'>
                        <button type='submit' className='form-control btn btn-primary search' onClick={handleSearch}>
                            Search
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search ms-2" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className='row mt-2 g-5'>
                    {cityCards()}
            </div>
            
        </div>
        

    )
}

export default City