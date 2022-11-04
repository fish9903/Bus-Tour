package com.example.models

import kotlinx.serialization.Serializable

@Serializable
data class BusTour (val id: Int, val name: String, var size: Int)

// bus tour 저장소
var busTourStorage = listOf(
    BusTour(0,"서울 tour bus1", 50),
    BusTour(1,"서울 tour bus2", 60)
)