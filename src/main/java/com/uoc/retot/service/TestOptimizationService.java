package com.uoc.retot.service;

import com.uoc.retot.dto.ResponseDTO;
import com.uoc.retot.dto.UploadFileResponseDTO;
import com.uoc.retot.dto.UserDTO;
import com.uoc.retot.exceptions.OtherException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class TestOptimizationService {

    @Autowired
    private FileStorageService fileStorageService;

    public UploadFileResponseDTO uploadCSVDocument(MultipartFile file, String fileName, String userId) {
        String newFileName = userId + "-" + fileName+".csv";
        String folderName = "CSV";
        UploadFileResponseDTO uploadDTO = fileStorageService.storeFile(file, folderName, newFileName);
        if (!uploadDTO.getFileName().equals(null)) {
            uploadDTO.setMessage("Table data saved successfully");
            uploadDTO.setSuccess(true);
            return uploadDTO;
        } else {
            return new UploadFileResponseDTO(false,"Unable to save table data ");
        }
    }

    public UploadFileResponseDTO optimizeTestCases(MultipartFile file, String userId) {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDateTime now = LocalDateTime.now();
        String newFileName = userId + "-" + dtf.format(now);
        String txtFileName = newFileName+".txt";
        String generatedFileName = newFileName+"-Pairwise_Test_Case_Document.xls";
        String folderName = "TXT";
        UploadFileResponseDTO uploadDTO = fileStorageService.storeFile(file, folderName, txtFileName);
        if (!uploadDTO.getFileName().equals(null)) {
            String fileLocation = uploadDTO.getTargetLocation().replace(txtFileName,"");
            String[] command =
                    {
                            "cmd",
                    };
            Process p;
            try {
                p = Runtime.getRuntime().exec(command);
                new Thread(new SyncPipe(p.getErrorStream(), System.err)).start();
                new Thread(new SyncPipe(p.getInputStream(), System.out)).start();
                PrintWriter stdin = new PrintWriter(p.getOutputStream());
                stdin.println("cd /");
                stdin.println("cd /d "+fileLocation);
                stdin.println("pict "+txtFileName+">"+generatedFileName);
                stdin.close();
                p.waitFor();
                uploadDTO.setFileName(generatedFileName);
                uploadDTO.setTargetLocation(fileLocation+generatedFileName);
                uploadDTO.setFileDownloadUri(uploadDTO.getFileDownloadUri().replace(txtFileName,generatedFileName));
                uploadDTO.setMessage("Table data saved successfully");
                uploadDTO.setSuccess(true);
            } catch (Exception e) {
                new OtherException("Generate Pairwise Document failed");
            }
            return uploadDTO;
        } else {
            return new UploadFileResponseDTO(false,"Unable Generate Pairwise Test Document");
        }
    }
}
