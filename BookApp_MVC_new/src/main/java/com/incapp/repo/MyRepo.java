package com.incapp.repo;

import java.util.List;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.incapp.entities.Book;
import com.incapp.entities.Login;

import jakarta.persistence.EntityManager;

@Repository
public class MyRepo {
	@Autowired
	private EntityManager entityManager;
	
	public Book getBook(String name) {
		Session session= entityManager.unwrap(Session.class);
		Book book=session.get(Book.class,name);
		session.close();
		return book;
	}
	
	public List<Book> getBooks(String name) {
		Session session= entityManager.unwrap(Session.class);
		List<Book> books = session.createQuery("select b from Book b where lower(b.name) like :name", Book.class)
			    .setParameter("name", "%" + name.toLowerCase() + "%")
			    .list();	
		session.close();
		return books;
	}
	public List<Book> getAllBooks() {
		Session session= entityManager.unwrap(Session.class);
		List<Book> books=session.createQuery("from Book",Book.class).list();		
		session.close();
		return books;
	}
}
