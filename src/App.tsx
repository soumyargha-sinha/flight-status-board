import React from "react"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import HomePage from "./pages/HomePage"
import DetailPage, { flightFetcher } from "./pages/DetailPage"

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path='/flight/:id' element={<DetailPage />} loader={flightFetcher} />
    </Route>
    )
  )
  return <RouterProvider router={router} />
}

export default App
