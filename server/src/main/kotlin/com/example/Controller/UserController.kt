package com.example.Controller

import com.example.entity.User
import com.example.entity.UserEntity
import org.jetbrains.exposed.sql.transactions.transaction

class UserController {
    fun addUser(user: User) = transaction {
        UserEntity.new {
            this.name = user.name
            this.phone_number = user.phone_number
        }
    }
}