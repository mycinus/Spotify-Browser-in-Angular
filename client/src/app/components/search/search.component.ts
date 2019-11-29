import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ArtistData } from '../../data/artist-data';
import { AlbumData } from '../../data/album-data';
import { TrackData } from '../../data/track-data';
import { ResourceData } from '../../data/resource-data';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ SpotifyService ]
})
export class SearchComponent implements OnInit {
  searchString:string;
  searchCategory:string = 'artist';
  searchCategories:string[] = ['artist', 'album', 'track'];
  resources:ResourceData[] = [];

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {

    var dropdown = document.getElementsByTagName('select')[0];

    for(var i= 0; i < this.searchCategories.length; i++) {
      var option = document.createElement("option");

      option.text = this.searchCategories[i];
      option.value = 'option'+ i;
      dropdown.add(option);
    }
    this.search(dropdown);
  }

  search(dropdown) {
    //TODO: call search function in spotifyService and parse response when enter is selected
    
    var searchButton =  document.getElementsByClassName('btn btn-light')[2];
    var userInput = document.getElementsByTagName('input')[0];


     searchButton.addEventListener('click', evt => {
       var result = dropdown.options[dropdown.selectedIndex].text;
       var searchSpotify = this.spotifyService.searchFor( result , userInput.value );
       searchSpotify.then( data => {

        console.log('HERE we go again!!!!', data);

        
        for(var i= 0; i < data.length; i++) {

           console.log('what is resources', this.resources);

           this.resources.push(data[i]);
         }
        console.log('WHAt is this resource', this.resources );

         console.log('WHAT IS THIS DOC ID', document.getElementById('hrefCard'));
         


       });

    });

  }
  

}
