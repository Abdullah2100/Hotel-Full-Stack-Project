package com.example.hoteldatalayer.Dto

import kotlinx.serialization.Serializable

@Serializable
data class UserDto(
    var id:Int=0,
    var userName: String ="",
    var phone:String="",
    var image:String="",
    var token:String="",
    var firstName:String="",
    var lastName:String="",
    var brithDay:Int=0,
    var isBlock:Boolean=false,
)
