package com.example.models

import kotlinx.serialization.Serializable

@Serializable
data class BusTour (val id: Int, val name: String, var size: Int)

var busTourStorage = listOf(BusTour(0,"Test tour bus1", 50), BusTour(1,"Test tour bus2", 60))