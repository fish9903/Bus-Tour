package com.example.entity

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.dao.*

import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable

/**
 * PersonInfo 엔티티의 테이블 정의
 * @property type 구매자 타입(아동, 청소년, 성인 등)
 * @property count 선택한 개수
 * @property price_pp 구매 당시의 가격
 * @property order (oid: 외래키). personinfo에 연결된 오더를 의미
 */
object Personinfos : IntIdTable() {
    val type = varchar("type", 10)
    val count = integer("count")
    val price_pp = integer("price_pp")
    val order = reference("oid", Orders)

    init {
        check {
            count greaterEq 0 // count는 0 이상
        }
        check {
            price_pp greaterEq 0 // 구매 가격은 음수가 될 수 없음
        }
    }
}

class PersoninfoEntity(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<PersoninfoEntity>(Personinfos)

    var type by Personinfos.type
    var count by Personinfos.count
    var price_pp by Personinfos.price_pp

    // 참조되는 놈은 var
    var oid by OrderEntity referencedOn Personinfos.order

    /**
     * PersonInfo를 반환합니다.
     * 항상 OrderEntity에 의해 사용된다고 가정하므로, id 값은 사용되지 않습니다.
     * @return PersonInfo data class {type, number}
     */
    fun getPersonInfo(): Personinfo {
        return Personinfo(
            this.type,
            this.count,
            this.price_pp
        )
    }
}

@Serializable
data class Personinfo(
    val type: String,
    var count: Int,
    val price_pp: Int
)