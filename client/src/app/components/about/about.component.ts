import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  name:string = null;
  profile_pic:string = "../../../assets/unknown.jpg";
  profile_link:string = null;

  //TODO: inject the Spotify service
  constructor( private spotify:SpotifyService) { }

  ngOnInit() {
    this.spotifyInfo();
  }

  /*TODO: create a function which gets the "about me" information from Spotify when the button in the view is clicked.
  In that function, update the name, profile_pic, and profile_link fields */
  spotifyInfo():any {

     var loadInfo =  document.getElementsByClassName('btn btn-light')[0];
     var aTag = document.getElementsByTagName('a')[2];
     var h3Tag = document.getElementsByTagName('h3')[0];
     var image = document.getElementsByTagName('img')[0];


    loadInfo.addEventListener('click', evt => {
      this.spotify.aboutMe().then( data => {

      var spotifyLink = data.spotifyProfile;
      var profile_pic = data.imageURL;
      var name = data.name;
      console.log(profile_pic);
      //This is for the spotify link
      aTag.href = spotifyLink;

      //This is for the image
      image.src = profile_pic;


      //This is for the spotify username
      h3Tag.innerHTML = "Logged in user: " + name;


      });


    })   


  }



}