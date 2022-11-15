package com.example.plugins

import io.ktor.server.application.*
import io.ktor.server.routing.*
import courseRoute
import purchaseInfoRoute

fun Application.configureRouting() {
    routing {
        courseRoute()
        purchaseInfoRoute()
    }
}