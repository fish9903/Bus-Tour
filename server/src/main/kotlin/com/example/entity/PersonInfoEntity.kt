package com.example.entity

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.dao.*

import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable

object PersonInfos: IntIdTable() {
    val type = varchar("type", 10)
    val number = integer("number")

    var order = reference("oid",Orders)
}

class PersonInfoEntity(id: EntityID<Int>): IntEntity(id) {
    companion object: IntEntityClass<PersonInfoEntity>(PersonInfos)
    var type by PersonInfos.type
    var number by PersonInfos.number
    // 참조되는 놈은 var
    var oid by OrderEntity referencedOn PersonInfos.order

    /**
     * PersonInfo를 반환합니다.
     * 항상 OrderEntity에 의해 사용된다고 가정하므로, id 값은 사용되지 않습니다.
     * @return PersonInfo data class {type, number}
     */
    fun getPersonInfo(): PersonInfo {
        return PersonInfo(type, number)
    }
}

@Serializable
data class PersonInfo(
    val type: String,
    val number: Int
)