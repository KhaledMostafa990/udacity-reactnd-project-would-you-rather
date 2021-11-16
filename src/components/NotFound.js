import React from 'react'
import NotFoundImg from '../utils/notFound.png'

export default function NotFound() {
    return (
        <main style={{  display:'flex', justifyContent:'cnter', alignItems:'center' }}>
            <img alt='NotFound' style={{width:'100%', height:'100%'}} src={NotFoundImg} />
        </main>
    )
}
