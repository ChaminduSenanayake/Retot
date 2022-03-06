package com.uoc.retot.controller;

import com.uoc.retot.dto.UploadFileResponseDTO;
import com.uoc.retot.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class FileController {
    @Autowired
    private FileStorageService fileStorageService;

    @GetMapping("/getFiles/{folderName}/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String folderName, @PathVariable String fileName, HttpServletRequest request) {
        // Load file as Resource
        Resource resource = fileStorageService.loadFiles(folderName, fileName);

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            ex.printStackTrace();
        }

        // Fallback to the default content type if type could not be determined
        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

//    @PostMapping("/document")
//    public List<UploadFileResponseDTO> getAllDocuments(@RequestParam("userId") String userId){
//        return fileStorageService.getAllDocuments(userId);
//    }

}
