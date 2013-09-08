package main

import (
  "bufio"
  "fmt"
  "log"
  "os"
  "regexp"
  "strings"
  //"bytes"
)



// readLines reads a whole file into memory
// and returns a slice of its lines.
func readLines(path string) ([]string, error) {
  file, err := os.Open(path)
  if err != nil {
    return nil, err
  }
  defer file.Close()

  var lines []string
  scanner := bufio.NewScanner(file)
  for scanner.Scan() {
    lines = append(lines, scanner.Text())
  }
  return lines, scanner.Err()
}

// writeLines writes the lines to the given file.
func writeLines(lines []string, path string) error {
  file, err := os.Create(path)
  if err != nil {
    return err
  }
  defer file.Close()

  w := bufio.NewWriter(file)
  for _, line := range lines {
    fmt.Fprintln(w, line)
  }
  return w.Flush()
}

// writeWords writes words (only uppercase) to the given file.
func writeWords(lines []string, path string) error {

  file, err := os.Create(path)
  
  files := make(map[string]*os.File)
  writers := make(map[string]*bufio.Writer)
  dictionary := make(map[string]int) //used to keep the words unique

  for _, value := range strings.SplitN("ABCDEFGHIJKLMNOPQRSTUVWXYZ", "", 26){

  	files[value], err = os.Create("./"+value+".js")
  	writers[value]= bufio.NewWriter(files[value])
  	fmt.Fprint(writers[value], "word_array_"+value+"={") // adding to the begining of the file:  word_array_A={
  }

  w := bufio.NewWriter(file) //write for general file that contains all the words
  fmt.Fprint(w, "word_array={")
  if err != nil {
    return err
  }
  //r, err := regexp.Compile(`[[:lower:]]|[[:blank:]]|(\n)`)
  r, err := regexp.Compile(`^[A-Z]([A-Z]|(\;\s)|\-)+[A-Z]$`)
  semi, err := regexp.Compile(`\;`)
  //r, err := regexp.Compile(`[A-Z]$`)
  if err != nil{
  	return err
  }
  defer file.Close()

  
  for _, line := range lines {
  	if r.MatchString(line){
  		if semi.MatchString(line){
  			//some entries are in the fomrat WORD1; WORD2; WORD3
  			words:= strings.Split(line, "; ")
  			for _, word := range words {

  				dictionary[word]=1

  				//fmt.Fprintln(w, word)
  				//fmt.Println("split words: %s", word)
  				//write to the file with first character of the word example BANK  B.js
  				//fmt.Println("word=%s letter=%s",word, string([]byte(word)[0]))

  				//if prefix:= string([]byte(word)[0]); prefix
  				/*if writers[string([]byte(word)[0])] !=nil {
  					fmt.Fprintln(writers[string([]byte(word)[0])], word)
  				}*/

  			}

  		}else{ //if line is a single word

  			dictionary[line]=1
  		
  			/*fmt.Fprintln(w, line)
  			if writers[string([]byte(line)[0])] !=nil {
  					fmt.Fprintln(writers[string([]byte(line)[0])], line)
  			}*/
  		}
    }else{

    	//fmt.Fprintln(w, line)


    }
  }
  //write the words to the files  array={'key1': 'value1','key2':'value2'};
  for key,_ := range dictionary{

  	fmt.Fprint(w, "\""+key+"\":1,")
  	if writers[string([]byte(key)[0])] !=nil {
  		fmt.Fprint(writers[string([]byte(key)[0])], "\""+key+"\":1,")
  	}

  }
  //close all the files
  for key,_ := range writers{

  	fmt.Fprint(w, "};")
  	fmt.Fprint(writers[key], "};")

  	writers[key].Flush()
  }
  return w.Flush()
}

func main() {
  lines, err := readLines("./29765.txt.utf-8.txt")
  if err != nil {
    log.Fatalf("readLines: %s", err)
  }
  /*for i, line := range lines {
    fmt.Println(i, line)
  }*/

  if err := writeWords(lines, "A_Z.js"); err != nil {
    //log.Fatalf("writeLines: %s", err)
    fmt.Println("writeLines: %s", err)
  }
}