package com.example.plugins

import io.ktor.server.application.*
import io.ktor.server.routing.*
import busTourRoute
import purchaseInfoRoute

fun Application.configureRouting() {
    routing {
        busTourRoute()
        purchaseInfoRoute()
    }
}
