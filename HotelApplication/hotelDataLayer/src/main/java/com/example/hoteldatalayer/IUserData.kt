package com.example.hoteldatalayer

import com.example.hoteldatalayer.Dto.UserDto
import com.example.hoteldatalayer.Util.EndPoint.Companion.BASEURL
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Path

interface IUserData {
    @GET("$BASEURL/{id}")
    suspend fun getUserDataByID(@Path("id")id:Int):Response<UserDto>
}