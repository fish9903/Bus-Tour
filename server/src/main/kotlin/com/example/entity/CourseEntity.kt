package com.example.entity

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable

/**
 * Course 엔티티의 테이블 정의
 * @property name 코스의 이름
 * @property thumbnail 이미지의 주소
 * @property short_desc 코스에 대한 짧은 묘사( 아름다운 속초 !)
 * @property description 코스에 대한 문서 내용
 * ( eager loading -> false )이므로, 코스에 대한 세부 내용을 가져올때 명시적으로 eager load 수행.
 */
object Courses: IntIdTable() {
    val name = varchar("name", 32)
    val thumbnail = varchar("thumbnail", 100)

    val short_desc = varchar("short_desc", 100)
    // 반드시 가져오지는 않는다.
    val description = text("description", eagerLoading = false)
    // 섬네일 정보도 필요할지도?
}

class CourseEntity(id:EntityID<Int>): IntEntity(id) {
    companion object: IntEntityClass<CourseEntity>(Courses)
    var name by Courses.name
    var thumbnail by Courses.thumbnail
    var short_desc by Courses.short_desc
    var description by Courses.description

    val programs by ProgramEntity referrersOn Programs.course
    // 남의 엔티티 / 남의꺼에서 내꺼 찾기
    val priceinfos by PriceinfoEntity referrersOn Priceinfos.course

    fun getCourseWithPrograms()= CourseWithPrograms(
        this.id.value,
        this.name,
        this.thumbnail,
        this.short_desc,
        this.description,
        this.programs.map {
            it -> it.getProgram()
        },
        this.priceinfos.map {
                it -> it.getPriceInfo()
        }
    )

    fun getCourseWithThumbnail() = CourseWithThumbnail(
        this.id.value,
        this.name,
        this.thumbnail,
        this.short_desc
    )
}

@Serializable
data class CourseWithThumbnail(
    val id: Int,
    val name: String,
    val thumbnail: String,
    val short_desc: String
)

@Serializable
data class CourseWithPrograms(
    val id: Int,
    val name: String,
    val thumbnail: String,
    val short_desc: String,
    val description: String,
    val programs: List<Program>,
    val priceinfos: List<Priceinfo>
)
