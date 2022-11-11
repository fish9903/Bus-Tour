package com.example.entity

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable

/**
 * Priceinfo 엔티티의 테이블 정의
 * @property type 구매자 타입(아동, 청소년, 성인 등)
 * @property price 타입에 따른 가격
 * @property course (cid: 외래키) priceinfo와 연결된 코스를 의미
 */
object Priceinfos : IntIdTable() {
    val type = varchar("type", 10)
    val price = integer("price")
    val course = reference("cid", Courses)

    init {
        // price는 항상 0 이상.
        check {
            price greaterEq 0
        }
    }
}

class PriceinfoEntity(id: EntityID<Int>): IntEntity(id) {
    companion object: IntEntityClass<PriceinfoEntity>(Priceinfos)

    var type by Priceinfos.type
    var price by Priceinfos.price
    var course by CourseEntity referencedOn Priceinfos.course

    fun getPriceInfo() = Priceinfo(
        this.type,
        this.price
    )
}

@Serializable
class Priceinfo(
    val type: String,
    val price: Int
)