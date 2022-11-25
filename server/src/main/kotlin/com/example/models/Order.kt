package com.example.models

import kotlinx.serialization.Serializable

@Serializable
data class Order (val id: Int)

// order 저장소
var orderStorage = mutableListOf<Order>()