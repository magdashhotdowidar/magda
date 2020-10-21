package com.all.Projectforall.configuration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;


public class FileUpload {
    private static String ABS_path = "FrontEnd\\treatement\\src\\assets\\images\\";
    private static String REAL_path = "";
    private static final Logger logger = LoggerFactory.getLogger(FileUpload.class);

    public static void UPloadImage(HttpServletRequest request, MultipartFile file, String name, String imageFor) {

        REAL_path = request.getSession().getServletContext().getRealPath("/assets/images/");
        logger.info("the real path" + REAL_path);
        logger.info("the abs path : " + ABS_path);

            String PRODUCT_ABS_path = ABS_path + imageFor+"\\";
            String PRODUCT_REAL_path = REAL_path +imageFor+ "\\";

            if (!new File(PRODUCT_ABS_path).exists()) new File(PRODUCT_ABS_path).mkdirs();
            if (!new File(PRODUCT_REAL_path).exists()) new File(PRODUCT_REAL_path).mkdirs();
            try {
                //project directory upload
                Path copyLocation = Paths
                        .get(PRODUCT_ABS_path + File.separator + StringUtils.cleanPath(file.getOriginalFilename()));
                Files.copy(file.getInputStream(), copyLocation, StandardCopyOption.REPLACE_EXISTING);

                //server upload
                Path copyLocation2 = Paths
                        .get(PRODUCT_REAL_path + File.separator + StringUtils.cleanPath(file.getOriginalFilename()));
                Files.copy(file.getInputStream(), copyLocation2, StandardCopyOption.REPLACE_EXISTING);
            } catch (IOException ex) {
                logger.error(ex.getMessage());
            }
    }

               /* //project directory upload
                file.transferTo(new File(PRODUCT_ABS_path + name));

                //server upload
                file.transferTo(new File(PRODUCT_REAL_path + name));*/
}
