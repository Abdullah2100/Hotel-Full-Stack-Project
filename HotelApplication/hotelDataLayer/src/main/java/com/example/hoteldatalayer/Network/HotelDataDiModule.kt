package com.example.hoteldatalayer.Network

import com.example.hoteldatalayer.IUserData
import com.example.hoteldatalayer.Util.EndPoint
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.create
import java.util.concurrent.TimeUnit



object obNetworkInstance {


        val client= OkHttpClient().newBuilder()
            .connectTimeout(10000L, TimeUnit.MILLISECONDS)
            .readTimeout(10000L, TimeUnit.MILLISECONDS)
            .writeTimeout(10000L, TimeUnit.MILLISECONDS).build()


   val retrofit =Retrofit.Builder()
            .baseUrl(EndPoint.BASEURL)
            .addConverterFactory(GsonConverterFactory.create())
            .client(client)
            .build()


    val userNetworkHolder: IUserData by lazy {
        retrofit.create(IUserData::class.java)

    }

}