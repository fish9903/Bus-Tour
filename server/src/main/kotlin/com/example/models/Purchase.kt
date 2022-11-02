package com.example.models

import kotlinx.serialization.Serializable

@Serializable
data class Purchase (val id: Int, val customer: Customer)

var purchaseStorage = mutableListOf<Purchase>()