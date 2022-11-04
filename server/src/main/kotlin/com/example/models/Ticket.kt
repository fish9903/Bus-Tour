package com.example.models

import kotlinx.serialization.Serializable

@Serializable
data class Ticket (val id: Int, val customer: MutableList<Customer>, val price: Int)

// ticket 저장소
var ticketStorage = mutableListOf<Ticket>()