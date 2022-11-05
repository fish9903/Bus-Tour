package com.example.entity

import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import org.jetbrains.exposed.dao.UUIDEntity
import org.jetbrains.exposed.dao.UUIDEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.UUIDTable
import org.jetbrains.exposed.sql.javatime.date
import java.util.UUID

object Orders : UUIDTable() {
    val ordered_date = date("ordered_date")
    val state = varchar("state", 10)
    val QRCode = varchar("qrcode",100)
}

// 엔티티 영역
class OrderEntity(id: EntityID<UUID>): UUIDEntity(id) {
    companion object: UUIDEntityClass<OrderEntity>(Orders)
    var ordered_date by Orders.ordered_date
    var state by Orders.state
    var QRCode by Orders.QRCode
    //참조하는 놈은 val
    val personInfos by PersonInfoEntity referrersOn PersonInfos.order

    /**
     * Order data 클래스에 대한 뷰를 반환합니다.
     * @return Order data class{id, ordered_date, state, QRCode, personInfos}
     */
    fun getOrder() : Order {
        return Order(
            id.toString(),
            ordered_date.toString(),
            state,
            QRCode,
            personInfos.map {
                it.getPersonInfo()
            }
        )
    }
}
// 데이터 영역
@Serializable
data class Order(
    val id: String,
    val ordered_date: String,
    val state: String,
    val QRcode : String,
    val personInfos: List<PersonInfo>
)