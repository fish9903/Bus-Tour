package com.example.Controller

import org.kodein.di.DI
import org.kodein.di.bind
import org.kodein.di.singleton

// dependency injection
// controller bind 해줘야함
fun DI.MainBuilder.bindControllers(){
    bind<CourseController>() with singleton { CourseController() }
    bind<OrderController>() with singleton { OrderController() }
    bind<UserController>() with singleton { UserController() }
}