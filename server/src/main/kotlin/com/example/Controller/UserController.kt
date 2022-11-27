package com.example.Controller

import com.example.entity.User
import com.example.entity.UserEntity
import com.example.entity.Users
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction

class UserController {
    fun addUser(user: User) = transaction {
        var flag = false

        val existingUser = UserEntity.find{ Users.name eq user.name and (Users.phone_number eq user.phone_number) }.find { it.name == user.name }
        println(existingUser)
        if(existingUser != null)
            flag = true
//        if(UserEntity.findById(user.name) != null) {
//            flag = true
//        }

        if(!flag) {
            UserEntity.new {
                this.name = user.name
                this.phone_number = user.phone_number
            }
        }
    }
    fun getAll(): Iterable<User> = transaction {
        UserEntity.all().map(UserEntity::getUser)
    }
}