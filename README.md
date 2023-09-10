URL Shortener feat. Docker and Microservices

Prerequisites:

   1. Git    : https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
   2. Docker : https://docs.docker.com/engine/install/

Steps:

   1. Navigate to where you want to clone the repository.
   2. Open a terminal inside the folder and clone the repository by running the following command:
                
          git clone https://github.com/Zubaer-Alam/url_shortener
          
   3. Navigate to the cloned directory:
            
          cd url_shortener
          
   4. Build and run the Docker containers:
         
          docker compose up -d
          
   5. Open your browser and access http://localhost:8000 to view the app.
   6. After you have finished viewing the app, stop the container:

          docker compose down
          
   

