import com.example.models.busTourStorage
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

// View
fun Route.busTourRoute() {
    get("/") {
        call.respondRedirect("server")
    }

    route("server") {
        get {
            // test - send text data
            call.respond("This is main page")
        }
    }
    route("server/busInfo") {// bus 정보 출력(id, name, size)
        get {
            if (busTourStorage.isNotEmpty()) {
                call.respond(busTourStorage)
            } else {
                call.respond("bus tour is empty")
            }
        }
    }
}