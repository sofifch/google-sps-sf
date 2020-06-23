package com.google.sps.servlets;

import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/blobstore-url")
public class BlobstoreServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    BlobstoreService myBlobstoreService = BlobstoreServiceFactory.getBlobstoreService();
    String myUploadUrl = myBlobstoreService.createUploadUrl("/data");

    response.setContentType("text/html");
    response.getWriter().println(myUploadUrl);
  }
}
