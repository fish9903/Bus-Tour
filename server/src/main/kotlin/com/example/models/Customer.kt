package com.example.models

import kotlinx.serialization.Serializable

@Serializable
data class Customer (val id: Int, val Name: String, val phoneNumber: String, val email: String)

// customer 저장소
var customerStorage = mutableListOf<Customer>()