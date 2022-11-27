package com.example.entity

import kotlinx.serialization.Serializable

@Serializable
data class PurchaseInfo(
    val name: String,
    val phone_number: String,
    val card_number: String,
    val pid: Int,
    val priceinfos: List<PCount>
)

@Serializable
data class PCount(
    val type: String,
    val count: Int,
)