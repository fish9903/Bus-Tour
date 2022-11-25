package com.example.entity

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.Op

/**
 * 유저 엔티티에 대한 테이블 정의
 * @property name 유저의 이름
 * @property phone_number 유저의 전화번호
 */
object Users : IntIdTable() {
    val name = varchar("name", 30)

    //https://stackoverflow.com/questions/723587/whats-the-longest-possible-worldwide-phone-number-i-should-consider-in-sql-varc
    //전화번호 길이 설정 기준
    val phone_number = varchar("pno", 16) // 넉넉하게 1 추가

    init {
        check("email_constraint") {
            phone_number regexp """[0-9]{1,16}""" // 0~9 숫자
        }
    }
}

class UserEntity(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<UserEntity>(Users)

    var name by Users.name
    var phone_number by Users.phone_number

    val order by OrderEntity referrersOn Orders.user

    fun getUser() = User(
        this.id.value,
        name,
        phone_number,
    )
}

@Serializable
data class User(
    val id: Int,
    val name: String,
    val phone_number: String,
)