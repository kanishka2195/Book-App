package com.incapp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.incapp.entities.Book;
import com.incapp.entities.Login;
import com.incapp.repo.MyRepo;

import jakarta.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;




@Controller
public class MyController {
	
	@Autowired
	MyRepo myRepo;
	
	@RequestMapping("/")
	public String home() {
		return "index";
	}
	

	
	@PostMapping("/SearchBooks")
	public String searchBooks(@RequestParam String name, ModelMap m) {
		List<Book> books = myRepo.getBooks(name);
		if (books.isEmpty()) {
			m.addAttribute("msg", "Book Not Found!");
			return "index";
		} else {
			m.addAttribute("books", books);
			return "PrintBooks";
		}
	}

	
	
}
