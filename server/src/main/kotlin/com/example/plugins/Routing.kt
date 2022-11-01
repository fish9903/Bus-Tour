package com.example.plugins

import io.ktor.server.application.*
import io.ktor.server.routing.*
import busTourRoute

fun Application.configureRouting() {
    routing {
        busTourRoute()
    }
}
