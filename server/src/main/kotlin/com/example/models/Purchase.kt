package com.example.models

import kotlinx.serialization.Serializable

@Serializable
data class Purchase (val id: Int, val customer: Customer)

// purchase 저장소
var purchaseStorage = mutableListOf<Purchase>()