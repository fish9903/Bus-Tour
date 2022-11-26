package com.example.entity

import kotlinx.serialization.Serializable

@Serializable
data class AllDataEntity(
    val id: Int, // order id
    val name: String, // user이름
    val phone_number: String,
    val card_number: String,
    val ordered_date: String,
    val up_date: String?,
    val personinfos: List<Personinfo>,
    val QRcode: String,
    val state: String,
    val total_price: Int,
    val programs: Program,
    val course: CourseWithThumbnail
    //val id: Int,
    //val name: String, // course이름
    //val thumbnail: String,
    //val short_desc: String
)